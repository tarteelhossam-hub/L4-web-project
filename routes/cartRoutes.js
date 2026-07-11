const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.route('/')
    .get(cartController.getCart)
    .post(cartController.addToCart)
    .delete(cartController.clearCart);
router.route("/items/:productId")
    .patch(cartController.updateCartItem)
    

module.exports = router;