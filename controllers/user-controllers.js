const { User } = require('../models/user');
const { HttpError } = require('../helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require("gravatar");
const path = require("path");
const Jimp = require("jimp");
const { SECRET_KEY } = process.env;
const fs = require("fs/promises");


const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw HttpError(409, "Email already in use");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const avatarURL = gravatar.url(email);
        const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });
        res.status(201).json({
            email: newUser.email,
            password: newUser.password,
            avatarURL,
        })
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(401, "Email or password is wrong");
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            throw HttpError(401, "Email or password is wrong");
        }
        const payload = {
            id: user._id,
        }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
        await User.findByIdAndUpdate(user._id, { token });
        res.json({
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
            }
        })
    } catch (error) {
        next(error);
    }
};

const getCurrentUser = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        email,
        subscription,
    })
};

const logOut = async (req, res, next) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { token: '' });
        res.status(204).json({
            message: "No Content"
        })
    } catch (error) {
        next(error)
    }
};

const updateSubscription = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const newStatus = await User.findByIdAndUpdate(_id, { subscription: req.body.subscription }, { new: true });
        if (!newStatus) {
            throw HttpError(404, "Not found");
        } res.json(newStatus);
    } catch (error) {
        next(error)
    }
}

const updateAvatar = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { path: tmpUpload, originalname } = req.file;
        const photoUser = await Jimp.read(tmpUpload)
        await photoUser
            .cover(250, 250)
            .writeAsync(tmpUpload);
        const filename = `${_id}_${originalname}`;
        const resultUpload = path.join(avatarsDir, filename);
        await fs.rename(tmpUpload, resultUpload);
        const avatarURL = path.join("avatars", filename);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({
            avatarURL,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login,
    getCurrentUser,
    logOut,
    updateSubscription,
    updateAvatar
}