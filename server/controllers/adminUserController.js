// ==========================================
// FEATURE: Admin User Controller
// ==========================================

const adminUserModel = require('../models/adminUserModel')

function emitUserNotification(req, userId, type, title, message) {
    const io = req.app.get('io')
    if (!io) {
        return
    }

    io.to(`user_${userId}`).emit('notification', {
        type,
        title,
        message,
        timestamp: new Date()
    })
}

async function getUsers(req, res) {
    try {
        const users = await adminUserModel.fetchAdminUsers()
        res.json({ success: true, users })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching users' })
    }
}

async function restrictUser(req, res) {
    const { userId, restrict } = req.body

    try {
        await adminUserModel.setUserRestriction(userId, restrict)
        emitUserNotification(
            req,
            userId,
            'SYSTEM',
            restrict ? 'Account Restricted' : 'Account Unrestricted',
            restrict ? 'Your account has been restricted by an administrator.' : 'Your account has been unrestricted.'
        )
        res.json({ success: true, message: restrict ? 'User restricted' : 'User unrestricted' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating user' })
    }
}

async function deleteUser(req, res) {
    const { userId } = req.body

    try {
        await adminUserModel.deleteUser(userId)
        res.json({ success: true, message: 'User deleted successfully' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting user' })
    }
}

module.exports = {
    getUsers,
    restrictUser,
    deleteUser
}