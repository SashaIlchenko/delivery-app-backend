const { Schema, model, SchemaTypes } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require('../helpers');

const orderSchema = new Schema({
    user: {
        id: String,
        name: String,
        email: String,
        phone: String,
        address: String,
    },
    currentOrder: SchemaTypes.Mixed,
    count: SchemaTypes.Mixed,
    totalPrice: {
        type: Number,
    },
}, { versionKey: false, timestamps: true });

orderSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    user: Joi.object().required(),
    currentOrder: Joi.array().required(),
    count: Joi.object().required(),
    totalPrice: Joi.number().required()

});
const schemas = {
    addSchema,
}
const Order = model("order", orderSchema);
module.exports = {
    Order,
    schemas,
}
