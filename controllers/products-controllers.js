const { Product } = require('../models/products');
const { HttpError } = require('../helpers');

const getAllProducts = async (req, res, next) => {
    try {
        const { shop } = req.query;
        const result = await Product.find({ shop }, "-createdAt -updatedAt");
        res.json(result);
    } catch (err) {
        next(err);
    }
};


const getContactById = async (req, res, next) => {
    try {

        const { contactId } = req.params;
        const result = await Product.findById(contactId);
        if (!result) {
            throw HttpError(404, 'Not found!');
        }
        res.json(result)

    } catch (err) {
        next(err);
    }
};

const addContact = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const result = await Product.create({ ...req.body, owner });
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

const updateContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Product.findByIdAndUpdate(contactId, req.body, { new: true });
        if (!result) {
            throw HttpError(404, 'Not found!');
        }
        res.json(result);
    } catch (err) {
        next(err);
    }

};

const updateStatusContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Product.findByIdAndUpdate(contactId, req.body, { new: true });
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json(result);
    } catch (err) {
        next(err)
    }

}

const deleteContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Product.findByIdAndRemove(contactId);
        if (!result) {
            throw HttpError(404, 'Not found!');
        }
        res.json({
            message: "contact deleted"
        })
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
    getContactById,
    addContact,
    updateContactById,
    updateStatusContact,
    deleteContactById,

}