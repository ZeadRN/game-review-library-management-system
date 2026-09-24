// ==========================================
// FEATURE: Marketplace Controller
// ==========================================

const marketplaceModel = require('../models/marketplaceModel')
const referralModel = require('../models/referralModel')

function notify(req, userId, type, title, message, link) {
    const io = req.app.get('io')
    if (!io) {
        return
    }

    io.to(`user_${userId}`).emit('notification', {
        type,
        title,
        message,
        link,
        timestamp: new Date()
    })
}

function notifyAdmins(req, type, title, message) {
    const io = req.app.get('io')
    if (!io) {
        return
    }

    io.to('admin_room').emit('admin_notification', { type, title, message, timestamp: new Date() })
}

async function createListing(req, res) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'User login required' })
    }

    try {
        await marketplaceModel.createListing(req.session.user.id, req.body)
        notifyAdmins(req, 'NEW_LISTING', 'New Listing Pending', `"${req.body.gameName}" needs approval`)
        res.json({ success: true, message: 'Listing created. Waiting for admin approval.' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating listing' })
    }
}

async function getListings(req, res) {
    try {
        const listings = await marketplaceModel.fetchListings(req.query)
        res.json({ success: true, listings })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching listings' })
    }
}

async function getListing(req, res) {
    try {
        await marketplaceModel.incrementViewCount(req.params.id)
        const listings = await marketplaceModel.fetchListingById(req.params.id)

        if (listings.length === 0) {
            return res.status(404).json({ success: false, message: 'Listing not found' })
        }

        const reviews = await marketplaceModel.fetchReviews(req.params.id)
        res.json({ success: true, listing: listings[0], reviews })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching listing' })
    }
}

async function buyListing(req, res) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'User login required' })
    }

    const { listingId } = req.body

    try {
        const listings = await marketplaceModel.fetchListingById(listingId)
        if (listings.length === 0) {
            return res.status(404).json({ success: false, message: 'Listing not found' })
        }

        const listing = listings[0]

        if (listing.stock_quantity <= 0 || listing.status === 'OUT_OF_STOCK') {
            return res.status(400).json({ success: false, message: 'Game is out of stock' })
        }
        if (listing.seller_id && listing.seller_id === req.session.user.id) {
            return res.status(400).json({ success: false, message: 'Cannot buy your own listing' })
        }
        if (!listing.admin_approved) {
            return res.status(400).json({ success: false, message: 'Listing not approved' })
        }

        const existingPurchase = await marketplaceModel.fetchPurchases(req.session.user.id, listingId)
        if (existingPurchase.length > 0) {
            return res.status(400).json({ success: false, message: 'You already own this game' })
        }

        const subscriptions = await marketplaceModel.fetchActiveSubscription(req.session.user.id)
        let discount = 0
        if (subscriptions.length > 0) {
            discount = subscriptions[0].discount_percentage
        }

        const finalPrice = listing.price * (1 - discount / 100)
        const users = await marketplaceModel.fetchUserBalance(req.session.user.id)
        if (users[0].balance < finalPrice) {
            return res.status(400).json({ success: false, message: 'Insufficient balance' })
        }

        const newStock = listing.stock_quantity - 1
        const newStatus = newStock <= 0 ? 'OUT_OF_STOCK' : 'AVAILABLE'
        await marketplaceModel.updateListingInventory(listingId, newStock, newStatus)
        await marketplaceModel.updateUserBalance(req.session.user.id, finalPrice)

        if (listing.seller_id) {
            await marketplaceModel.creditSellerBalance(listing.seller_id, listing.price)
            notify(req, listing.seller_id, 'SALE', 'Game Sold!', `Your game "${listing.game_name}" was sold for $${listing.price}!`, '/user-dashboard')
        }

        await marketplaceModel.createPurchase(req.session.user.id, listingId, finalPrice, listing.price, discount)

        const referrals = await referralModel.fetchPendingReferral(req.session.user.id)
        if (referrals.length > 0) {
            const referral = referrals[0]
            await marketplaceModel.creditSellerBalance(referral.referrer_id, referral.bonus_amount)
            await marketplaceModel.creditSellerBalance(referral.referred_id, referral.bonus_amount)
            await referralModel.completeReferral(referral.referral_id)

            notify(req, referral.referrer_id, 'REFERRAL', 'Referral Bonus!', `Your referral made a purchase! You earned $${referral.bonus_amount} bonus!`, '/user-dashboard')
        }

        notify(req, req.session.user.id, 'PURCHASE', 'Purchase Successful!', `You purchased "${listing.game_name}"${discount > 0 ? ` with ${discount}% subscriber discount!` : ''}`, '/user-dashboard')

        res.json({ success: true, message: 'Purchase successful', gameKey: listing.game_key, finalPrice, discount })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error processing purchase' })
    }
}

async function submitReview(req, res) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'User login required' })
    }

    const { rating, reviewText } = req.body
    const listingId = req.params.id

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ success: false, message: 'Rating must be 1-5' })
    }

    try {
        const purchases = await marketplaceModel.fetchPurchases(req.session.user.id, listingId)
        if (purchases.length === 0) {
            return res.status(400).json({ success: false, message: 'You can only review games you purchased' })
        }

        await marketplaceModel.upsertReview(listingId, req.session.user.id, rating, reviewText)
        res.json({ success: true, message: 'Review submitted' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error submitting review' })
    }
}

async function getReviews(req, res) {
    try {
        const reviews = await marketplaceModel.fetchReviews(req.params.id)
        res.json({ success: true, reviews })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching reviews' })
    }
}

module.exports = {
    createListing,
    getListings,
    getListing,
    buyListing,
    submitReview,
    getReviews
}