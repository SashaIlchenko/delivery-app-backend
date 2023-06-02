const { Product } = require('../models/products');

const getAllProducts = async (req, res, next) => {
    try {
        const { shop } = req.query;
        const result = await Product.find({ shop }, "-createdAt -updatedAt");
        res.json(result);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllProducts,
}