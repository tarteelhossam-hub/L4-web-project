const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

exports.createOrder = asyncHandler(async (req, res, next) => {
    const { shippingAddress } = req.body;
    const cart = await Cart.findOne().populate('items.product');

    if (!cart || cart.items.length === 0) {
        return next(new AppError('Your cart is empty. Cannot place an order.', 400));
    }

    const orderItems = [];

    for (const item of cart.items) {
        const product = item.product;

        if (product.stock < item.quantity) {
            return next(new AppError(`Not enough stock for ${product.name}. Available: ${product.stock}`, 400));
        }

        product.stock -= item.quantity;
        await product.save();

        orderItems.push({
            product: product._id,
            name: product.name,
            quantity: item.quantity,
            price: item.price
        });
    }

    const order = await Order.create({
        items: orderItems,
        totalPrice: cart.totalPrice,
        shippingAddress
    });

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({
        status: 'success',
        data: { order }
    });
});

exports.getAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await Order.find().populate('items.product', 'name');
    res.status(200).json({ status: 'success', results: orders.length, data: { orders } });
});

exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
        req.params.id, 
        { status }, 
        { new: true, runValidators: true }
    );
    if (!order) {
        return next(new AppError('No order found with that ID.', 404));
    }
    res.status(200).json({ status: 'success', data: { order } });
}); 

exports.getOrderById = asyncHandler(async (req, res, next) => {س
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) {
        return next(new AppError('No order found with that ID', 404));
    }
    res.status(200).json({ status: 'success', data: { order } });
});