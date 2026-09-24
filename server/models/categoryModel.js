// ==========================================
// FEATURE: Category Model
// ==========================================

const { query } = require('../config/db');

class CategoryModel {
    async getAllCategories() {
        return query('SELECT * FROM Game_Category ORDER BY name');
    }

    async createCategory(name, description, icon) {
        return query(
            'INSERT INTO Game_Category (name, description, icon) VALUES (?, ?, ?)',
            [name.trim(), description || null, icon || 'fa-gamepad']
        );
    }

    async clearCategoryFromListings(categoryId) {
        return query('UPDATE Game_Listing SET category_id = NULL WHERE category_id = ?', [categoryId]);
    }

    async deleteCategory(categoryId) {
        return query('DELETE FROM Game_Category WHERE category_id = ?', [categoryId]);
    }
}

module.exports = new CategoryModel();