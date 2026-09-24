// ==========================================
// FEATURE: Subscription Controller
// ==========================================

const subscriptionModel = require('../models/subscriptionModel');
const NotificationController = require('./notificationController');

const PLANS = {
    monthly: { type: 'MONTHLY', price: 9.99, discount: 20, months: 1 },
    yearly: { type: 'YEARLY', price: 99.99, discount: 20, months: 12 }
};

function getPlans(req, res) {
    const plans = subscriptionModel.getPlans();
    res.json({ success: true, plans });
}

async function createSubscription(req, res) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'User login required' });
    }

    const { planType } = req.body;

    try {
        const existing = await subscriptionModel.checkExistingSubscription(req.session.user.id);
        if (existing) {
            return res.status(400).json({ success: false, message: 'Already subscribed' });
        }

        const plan = PLANS[(planType || '').toLowerCase()];
        if (!plan) {
            return res.status(400).json({ success: false, message: 'Invalid subscription plan' });
        }

        const price = plan.price;
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + plan.months);

        const balance = await subscriptionModel.getUserBalance(req.session.user.id);
        if (balance < price) {
            return res.status(400).json({ success: false, message: 'Insufficient balance. Please add balance first.' });
        }

        await subscriptionModel.deductBalance(req.session.user.id, price);
        await subscriptionModel.createSubscription(req.session.user.id, plan.type, endDate, plan.discount);

        await NotificationController.sendNotification(req, req.session.user.id, 'SYSTEM',
            'Subscription Active!',
            `Your ${plan.type.toLowerCase()} subscription is now active. Enjoy ${plan.discount}% off all purchases!`,
            '/user-dashboard'
        );

        res.json({ success: true, message: 'Subscription created successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error creating subscription' });
    }
}

async function cancelSubscription(req, res) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'User login required' });
    }

    try {
        await subscriptionModel.cancelSubscription(req.session.user.id);
        res.json({ success: true, message: 'Subscription cancelled' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error cancelling subscription' });
    }
}

async function getSubscription(req, res) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'User login required' });
    }

    try {
        const subscriptions = await subscriptionModel.getActiveSubscription(req.session.user.id);

        if (subscriptions.length === 0) {
            return res.json({ success: true, subscription: null });
        }

        const subscription = subscriptions[0];
        res.json({
            success: true,
            subscription: {
                ...subscription,
                plan_name: subscription.plan_type.toLowerCase()
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching subscription' });
    }
}

async function subscribe(req, res) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'User login required' });
    }

    const { planName } = req.body;
    const plan = PLANS[(planName || '').toLowerCase()];
    if (!plan) {
        return res.status(400).json({ success: false, message: 'Invalid subscription plan' });
    }

    try {
        const existing = await subscriptionModel.checkExistingSubscription(req.session.user.id);
        if (existing) {
            return res.status(400).json({ success: false, message: 'Already subscribed' });
        }

        const balance = await subscriptionModel.getUserBalance(req.session.user.id);
        if (balance < plan.price) {
            return res.status(400).json({ success: false, message: 'Insufficient balance. Please add balance first.' });
        }

        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + plan.months);

        await subscriptionModel.deductBalance(req.session.user.id, plan.price);
        await subscriptionModel.createSubscription(req.session.user.id, plan.type, endDate, plan.discount);

        res.json({ success: true, message: 'Subscription created successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error creating subscription' });
    }
}

module.exports = {
    getPlans,
    createSubscription,
    cancelSubscription,
    getSubscription,
    subscribe
};