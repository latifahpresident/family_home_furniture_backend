const express = require('express');
const productsRoutes = require('../controllers/products');
const router = express.Router();

router.get('/',  productsRoutes.getProducts);
router.get('/product/:id', productsRoutes.getProductById);
router.get('/product', productsRoutes.filterBy);

module.exports = router;