// ==========================================
// FEATURE: Category Controller
// ==========================================

const categoryModel = require('../models/categoryModel');

class CategoryController {
    // GET /api/categories
    async getAllCategories(req, res) {
        try {
            const categories = await categoryModel.getAllCategories();
            res.json({ success: true, categories });
        } catch (err) {
            res.status(500).json({ success: false, message: 'Error fetching categories' });
        }
    }

    // POST /api/admin/category/create
    async createCategory(req, res) {
        if (!req.session.user || req.session.user.type !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access required' });
        }

        const { name, description, icon } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ success: false, message: 'Category name is required' });
        }

        try {
            await categoryModel.createCategory(name, description, icon);
            res.json({ success: true, message: 'Category created successfully' });
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ success: false, message: 'Category already exists' });
            }
            res.status(500).json({ success: false, message: 'Error creating category' });
        }
    }

    // DELETE /api/admin/category/:id
    async deleteCategory(req, res) {
        if (!req.session.user || req.session.user.type !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access required' });
        }

        try {
            await categoryModel.clearCategoryFromListings(req.params.id);
            await categoryModel.deleteCategory(req.params.id);
            res.json({ success: true, message: 'Category deleted' });
        } catch (err) {
            res.status(500).json({ success: false, message: 'Error deleting category' });
        }
    }
}

module.exports = CategoryController;