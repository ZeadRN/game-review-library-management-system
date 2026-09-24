// ==========================================
// FEATURE: Admin Dashboard Controller
// ==========================================

const adminDashboardModel = require('../models/adminDashboardModel');
const NotificationController = require('./notificationController');

async function getStats(req, res) {
    if (!req.session.user || req.session.user.type !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    try {
        const totalUsers = await adminDashboardModel.getTotalUsers();
        const totalListings = await adminDashboardModel.getTotalListings();
        const pendingApprovals = await adminDashboardModel.getPendingApprovals();
        const totalPurchases = await adminDashboardModel.getTotalPurchases();
        const activeSubscriptions = await adminDashboardModel.getActiveSubscriptions();
        const pendingBalanceRequests = await adminDashboardModel.getPendingBalanceRequests();
        const unansweredQuestions = await adminDashboardModel.getUnansweredQuestions();

        res.json({
            success: true,
            stats: {
                totalUsers,
                totalListings,
                pendingApprovals,
                totalPurchases: totalPurchases.count,
                totalRevenue: totalPurchases.revenue,
                activeSubscriptions,
                pendingBalanceRequests,
                unansweredQuestions
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching stats' });
    }
}

async function getAllListings(req, res) {
    if (!req.session.user || req.session.user.type !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    try {
        const listings = await adminDashboardModel.getAllListings();
        res.json({ success: true, listings });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching listings' });
    }
}

async function approveListing(req, res) {
    if (!req.session.user || req.session.user.type !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const { listingId, approve } = req.body;

    try {
        const listing = await adminDashboardModel.getListingById(listingId);
        if (listing.length === 0) {
            return res.status(404).json({ success: false, message: 'Listing not found' });
        }

        await adminDashboardModel.updateListingApproval(listingId, approve);

        if (listing[0].seller_id) {
            await NotificationController.sendNotification(req, listing[0].seller_id, 'APPROVAL',
                approve ? 'Listing Approved!' : 'Listing Rejected',
                approve ? `Your game "${listing[0].game_name}" has been approved and is now live!` 
                        : `Your game "${listing[0].game_name}" was not approved.`,
                '/user-dashboard'
            );

            if (approve) {
                const wishlists = await adminDashboardModel.getWishlistsByGameName(listing[0].game_name);

                for (const wish of wishlists) {
                    await NotificationController.sendNotification(req, wish.user_id, 'WISHLIST',
                        'Wishlist Game Available!',
                        `"${listing[0].game_name}" is now available for purchase!`,
                        '/user-dashboard'
                    );
                    await adminDashboardModel.updateWishlistNotification(wish.wishlist_id, listingId);
                }
            }
        }

        res.json({ success: true, message: approve ? 'Listing approved' : 'Listing disapproved' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error updating listing' });
    }
}

async function getBalanceRequests(req, res) {
    if (!req.session.user || req.session.user.type !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    try {
        const requests = await adminDashboardModel.getAllBalanceRequests();
        res.json({ success: true, requests });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching balance requests' });
    }
}

async function processBalanceRequest(req, res) {
    if (!req.session.user || req.session.user.type !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const { requestId, approve } = req.body;

    try {
        const requests = await adminDashboardModel.getBalanceRequestById(requestId);
        if (requests.length === 0) {
            return res.status(404).json({ success: false, message: 'Request not found' });
        }

        const request = requests[0];
        if (request.status !== 'PENDING') {
            return res.status(400).json({ success: false, message: 'Request already processed' });
        }

        const status = approve ? 'APPROVED' : 'REJECTED';
        await adminDashboardModel.updateBalanceRequestStatus(requestId, status, req.session.user.id);

        if (approve) {
            await adminDashboardModel.addUserBalance(request.user_id, request.amount);
        }

        await NotificationController.sendNotification(req, request.user_id, 'SYSTEM',
            approve ? 'Balance Added!' : 'Balance Request Rejected',
            approve ? `$${request.amount} has been added to your account.` : 'Your balance request was rejected.',
            '/user-dashboard'
        );

        res.json({ success: true, message: approve ? 'Balance approved' : 'Balance rejected' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error processing request' });
    }
}

async function createListing(req, res) {
    if (!req.session.user || req.session.user.type !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const { gameName, description, price, gameKey, categoryId, trailerUrl, screenshots, stockQuantity } = req.body;

    try {
        await adminDashboardModel.createAdminListing(
            gameName, description, price, gameKey, stockQuantity, categoryId, trailerUrl, screenshots
        );
        res.json({ success: true, message: 'Admin listing created successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error creating listing' });
    }
}

module.exports = {
    getStats,
    getAllListings,
    approveListing,
    getBalanceRequests,
    processBalanceRequest,
    createListing
};