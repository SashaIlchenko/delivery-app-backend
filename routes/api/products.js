const express = require('express');

const productController = require('../../controllers/products-controllers');

const { validateBody } = require("../../middlewares");
const { schemas } = require('../../models/products');
const router = express.Router();

router.get('/', validateBody(schemas.addSchema), productController.getAllProducts);

module.exports = router;
