const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

exports.addToCart = asyncHandler(async (req, res, next) => {
    const { productId, quantity } = req.body;

    // 1) التأكد إن المنتج موجود
    const product = await Product.findById(productId);
    if (!product) {
        return next(new AppError('No product found with that ID.', 404));
    }

    // 2) جلب الكارت أو إنشائها
    let cart = await Cart.findOne();
    if (!cart) {
        cart = await Cart.create({ items: [], totalPrice: 0 });
    }

    // 3) تشيك لو المنتج مضاف قبل كده
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity || 1;
    } else {
        cart.items.push({ product: productId, quantity: quantity || 1, price: product.price });
    }

    // 🔥 4) السطر السحري اللي كان ناقص: حساب السعر الإجمالي قبل الحفظ
    cart.totalPrice = cart.items.reduce((total, item) => {
        return total + (Number(item.quantity) * Number(item.price));
    }, 0);

    // 5) الحفظ في الـ Database
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

exports.clearCart = asyncHandler(async (req, res, next) => {
    const cart = await Cart.findOne();
    if (cart) {
        cart.items = [];
        cart.totalPrice = 0; // 🔥 وصفرنا السعر هنا كمان بالمرة عشان النظافة
        await cart.save();
    }

    res.status(200).json({
        status: 'success',
        message: 'Cart cleared successfully.',
        data: null
    });
});