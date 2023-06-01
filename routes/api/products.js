const express = require('express');

const productController = require('../../controllers/products-controllers');

const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require('../../models/products');
const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/:contactId', productController.getContactById, isValidId);

router.post('/', validateBody(schemas.addSchema), productController.addContact);

router.patch('/:contactId/favourite', validateBody(schemas.updateFavoriteSchema), productController.updateStatusContact, isValidId);

router.delete('/:contactId', productController.deleteContactById, isValidId);

router.put('/:contactId', validateBody(schemas.addSchema), productController.updateContactById, isValidId);

module.exports = router;
