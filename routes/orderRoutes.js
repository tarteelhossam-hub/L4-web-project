const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.route('/')
    .get(orderController.getAllOrders)
    .post(orderController.createOrder);
router.route('/:id')
    .put(orderController.updateOrderStatus)
    .get(orderController.getOrderById)
    .patch(orderController.updateOrderStatus); 

module.exports = router;