const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

exports.addToCart = asyncHandler(async (req, res, next) => {
    const { productId, quantity } = req.body;
    const requestedQuantity = Number(quantity) || 1;

    const product = await Product.findById(productId);
    if (!product) {
        return next(new AppError('No product found with that ID.', 404));
    }

    if (requestedQuantity > product.stock) {
        return next(new AppError(`Requested quantity exceeds available stock. Available: ${product.stock}`, 400));
    }

    let cart = await Cart.findOne();
    if (!cart) {
        cart = await Cart.create({ items: [], totalPrice: 0 });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
        const totalNewQty = cart.items[itemIndex].quantity + requestedQuantity;
        if (totalNewQty > product.stock) {
            return next(new AppError(`Total quantity in cart exceeds available stock. Available: ${product.stock}`, 400));
        }
        cart.items[itemIndex].quantity = totalNewQty;
    } else {
        cart.items.push({ product: productId, quantity: requestedQuantity, price: product.price });
    }

    cart.totalPrice = cart.items.reduce((total, item) => {
        return total + (Number(item.quantity) * Number(item.price));
    }, 0);

    await cart.save();

    res.status(200).json({
        status: 'success',
        data: { cart }
    });
});

exports.getCart = asyncHandler(async (req, res, next) => {
    const cart = await Cart.findOne().populate('items.product', 'name price');
    
    if (!cart) {
        return next(new AppError('Your cart is empty.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { cart }
    });
});

exports.updateCartItem = asyncHandler(async (req, res, next) => {
    const { productId, quantity } = req.body;
    const newQuantity = Number(quantity);

    const product = await Product.findById(productId);
    if (!product) return next(new AppError('Product not found.', 404));

    const cart = await Cart.findOne();
    if (!cart) return next(new AppError('Your cart is empty.', 404));

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            if (newQuantity > product.stock) {
                return next(new AppError(`Requested quantity exceeds available stock. Available: ${product.stock}`, 400));
            }
            cart.items[itemIndex].quantity = newQuantity;
        }

        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + (Number(item.quantity) * Number(item.price));
        }, 0);

        await cart.save();
    } else {
        return next(new AppError('Product not found in cart.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { cart }
    });
});

exports.clearCart = asyncHandler(async (req, res, next) => {
    const cart = await Cart.findOne();
    if (cart) {
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();
    }

    res.status(200).json({
        status: 'success',
        message: 'Cart cleared successfully.',
        data: null
    });
});