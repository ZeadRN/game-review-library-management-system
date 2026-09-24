// ==========================================
// FEATURE: Category Routes
// ==========================================

const express = require('express');
const CategoryController = require('../controllers/categoryController');

const router = express.Router();
const categoryController = new CategoryController();

// Public routes
router.get('/categories', (req, res) => categoryController.getAllCategories(req, res));

// Admin routes
router.post('/admin/category/create', (req, res) => categoryController.createCategory(req, res));
router.delete('/admin/category/:id', (req, res) => categoryController.deleteCategory(req, res));

module.exports = router;
