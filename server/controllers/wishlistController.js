// ==========================================
// FEATURE: Wishlist Controller
// ==========================================

const wishlistModel = require('../models/wishlistModel')

function notifyAdmins(req, type, title, message) {
    const io = req.app.get('io')
    if (!io) {
        return
    }

    io.to('admin_room').emit('admin_notification', { type, title, message, timestamp: new Date() })
}

async function addWishlist(req, res) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'User login required' })
    }

    const { gameName, listingId } = req.body

    try {
        await wishlistModel.createWishlistEntry(req.session.user.id, gameName, listingId)
        notifyAdmins(req, 'WISHLIST', 'New Wishlist Request', `User wants: "${gameName}"`)
        res.json({ success: true, message: 'Added to wishlist' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding to wishlist' })
    }
}

async function getWishlist(req, res) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'User login required' })
    }

    try {
        const wishlist = await wishlistModel.fetchWishlist(req.session.user.id)
        res.json({ success: true, wishlist })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching wishlist' })
    }
}

async function removeWishlist(req, res) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'User login required' })
    }

    try {
        await wishlistModel.deleteWishlistEntry(req.params.id, req.session.user.id)
        res.json({ success: true, message: 'Removed from wishlist' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error removing from wishlist' })
    }
}

async function getAdminWishlists(req, res) {
    try {
        const wishlists = await wishlistModel.fetchAdminWishlists()
        res.json({ success: true, wishlists })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching wishlists' })
    }
}

module.exports = {
    addWishlist,
    getWishlist,
    removeWishlist,
    getAdminWishlists
}