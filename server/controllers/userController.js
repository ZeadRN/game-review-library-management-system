// ==========================================
// FEATURE: User Controller
// ==========================================

const userModel = require('../models/userModel')

async function getProfile(req, res) {
    try {
        const results = await userModel.findUserProfile(req.session.user.id)

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        res.json({ success: true, user: results[0] })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' })
    }
}

async function updateProfile(req, res) {
    const { bio, profile_picture, language_preference } = req.body

    try {
        await userModel.updateUserProfile(req.session.user.id, bio, profile_picture, language_preference)
        res.json({ success: true, message: 'Profile updated' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating profile' })
    }
}

async function deleteAccount(req, res) {
    try {
        await userModel.deleteUserData(req.session.user.id)
        req.session.destroy()
        res.json({ success: true, message: 'Account deleted successfully' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting account' })
    }
}

async function getNotifications(req, res) {
    try {
        const notifications = await userModel.findUserNotifications(req.session.user.id)
        res.json({ success: true, notifications })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching notifications' })
    }
}

async function markNotificationRead(req, res) {
    try {
        await userModel.markNotificationRead(req.params.id, req.session.user.id)
        res.json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error' })
    }
}

async function markAllNotificationsRead(req, res) {
    try {
        await userModel.markAllNotificationsRead(req.session.user.id)
        res.json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error' })
    }
}

async function getPurchases(req, res) {
    try {
        const purchases = await userModel.fetchUserPurchases(req.session.user.id)
        res.json({ success: true, purchases })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching purchases' })
    }
}

async function getListings(req, res) {
    try {
        const listings = await userModel.fetchUserListings(req.session.user.id)
        res.json({ success: true, listings })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching listings' })
    }
}

module.exports = {
    getProfile,
    updateProfile,
    deleteAccount,
    getNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    getPurchases,
    getListings
}