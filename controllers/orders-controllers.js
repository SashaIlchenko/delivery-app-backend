const { Order } = require('../models/orders');

const addOrder = async (req, res, next) => {
    try {
        const result = await Order.create({ ...req.body });
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};
module.exports = {
    addOrder
}