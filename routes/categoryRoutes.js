const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.route('/')
    .get(categoryController.getCategories)
    .post(categoryController.createCategory);


router.route('/:id')
    .get(categoryController.getCategory)
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory)
    .patch(categoryController.updateCategory); // Added this line to handle PATCH requests for updating category

module.exports = router;