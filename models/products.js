const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require('../helpers');

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
}, { versionKey: false, timestamps: true });

productSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().required(),
  photo: Joi.string(),
  price: Joi.string().required(),
});

const schemas = {
  addSchema,
}

const Product = model("product", productSchema);

module.exports = {
  Product,
  schemas,
}





















