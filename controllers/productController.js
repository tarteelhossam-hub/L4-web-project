const Product = require('../models/Product');
const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

exports.createProduct = asyncHandler(async (req, res, next) => {
    const categoryExists = await Category.findById(req.body.category);
    if (!categoryExists) {
        return next(new AppError('Invalid Category ID. This category does not exist.', 400));
    }
    const newProduct = await Product.create(req.body);
    res.status(201).json({
        status: 'success',
        data: { product: newProduct }
    });
});

exports.getAllProducts = asyncHandler(async (req, res, next) => {
    const queryObj = { ...req.query };
    
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = Product.find(JSON.parse(queryStr)).populate('category', 'name description');
    const products = await query;

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: { products }
    });
});

exports.getProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (!product) {
        return next(new AppError('No product found with that ID.', 404));
    }
    res.status(200).json({
        status: 'success',
        data: { product }
    });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
    if (req.body.category) {
        const categoryExists = await Category.findById(req.body.category);
        if (!categoryExists) {
            return next(new AppError('Invalid Category ID. This category does not exist.', 400));
        }
    }
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        web: true,
        runValidators: true
    });
    if (!updatedProduct) {
        return next(new AppError('No product found with that ID.', 404));
    }
    res.status(200).json({
        status: 'success',
        data: { product: updatedProduct }
    });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return next(new AppError('No product found with that ID.', 404));
    }
    res.status(200).json({
        status: 'success',
        message: 'Product deleted successfully.',
        data: null
    });
});