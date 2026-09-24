// ==========================================
// FEATURE: Socket Controller
// ==========================================

const helpModel = require('../models/helpModel');

class SocketController {
    constructor() {
        this.connectedUsers = new Map();
        this.connectedAdmins = new Map();
    }

    init(io) {
        io.on('connection', (socket) => {
            const session = socket.request.session;
            
            if (session && session.user) {
                if (session.user.type === 'user') {
                    this.connectedUsers.set(session.user.id, socket.id);
                } else if (session.user.type === 'admin') {
                    this.connectedAdmins.set(session.user.id, socket.id);
                }
            }

            socket.on('join', (data) => {
                if (data.userId) {
                    socket.join(`user_${data.userId}`);
                }
                if (data.adminId) {
                    socket.join(`admin_${data.adminId}`);
                    socket.join('admin_room');
                }
            });

            socket.on('chat_message', async (data) => {
                const { userId, message, senderType } = data;
                
                try {
                    let adminId = null;
                    if (senderType === 'ADMIN' && session && session.user) {
                        adminId = session.user.id;
                    }
                    
                    await helpModel.saveSocketChatMessage(userId, adminId, message, senderType);
                    
                    io.to(`user_${userId}`).emit('new_message', { userId, message, senderType, timestamp: new Date() });
                    io.to('admin_room').emit('new_message', { userId, message, senderType, timestamp: new Date() });
                } catch (err) {
                    console.error('Chat message error:', err);
                }
            });

            socket.on('disconnect', () => {
                if (session && session.user) {
                    if (session.user.type === 'user') {
                        this.connectedUsers.delete(session.user.id);
                    } else {
                        this.connectedAdmins.delete(session.user.id);
                    }
                }
            });
        });
    }
}

module.exports = new SocketController();
