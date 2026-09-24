// ==========================================
// FEATURE: Notification Controller
// ==========================================

const notificationModel = require('../models/notificationModel');

class NotificationController {
    static async sendNotification(req, userId, type, title, message, link = null) {
        try {
            await notificationModel.createNotification(userId, type, title, message, link);
            const io = req.app.get('io');
            if (io) {
                io.to(`user_${userId}`).emit('notification', { type, title, message, link, timestamp: new Date() });
            }
        } catch (err) {
            console.error('Notification error:', err);
        }
    }

    static notifyAdmins(req, type, title, message) {
        const io = req.app.get('io');
        if (io) {
            io.to('admin_room').emit('admin_notification', { type, title, message, timestamp: new Date() });
        }
    }
}

module.exports = NotificationController;
