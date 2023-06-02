const express = require('express');

const productController = require('../../controllers/orders-controllers');

const router = express.Router();

router.post('/', productController.addOrder);

module.exports = router;