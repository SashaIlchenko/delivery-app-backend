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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
}, { versionKey: false, timestamps: true });

productSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
const schemas = {
  addSchema,
  updateFavoriteSchema,
}

const Product = model("product", productSchema);

module.exports = {
  Product,
  schemas,
}





















