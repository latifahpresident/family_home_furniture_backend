const express = require('express');
const ordersRoutes = require('../controllers/order');
const router = express.Router();
const isAuthenticated = require("./../middleware/auth");

router.post('/place-order', ordersRoutes.addOrder);
router.get('/', ordersRoutes.getOrders);
router.get('/:id', ordersRoutes.getOrderById);
router.get('/agent/:agent_id', ordersRoutes.getOrdersByAgentId);

module.exports = router