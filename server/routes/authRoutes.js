// ==========================================
// FEATURE: Auth Routes
// ==========================================

const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router()

router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)
router.post('/admin/register', authController.registerAdmin)
router.post('/admin/login', authController.loginAdmin)
router.post('/logout', authController.logout)
router.get('/check-session', authController.checkSession)

module.exports = router