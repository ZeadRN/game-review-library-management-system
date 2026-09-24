// ==========================================
// FEATURE: Admin User Routes
// ==========================================

const express = require('express')
const adminUserController = require('../controllers/adminUserController')
const { requireAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/users', requireAdmin, adminUserController.getUsers)
router.post('/restrict-user', requireAdmin, adminUserController.restrictUser)
router.delete('/delete-user', requireAdmin, adminUserController.deleteUser)

module.exports = router