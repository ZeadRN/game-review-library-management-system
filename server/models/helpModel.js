// ==========================================
// FEATURE: Help Model
// ==========================================

const { query } = require('../config/db');

class HelpModel {
    async getAllQuestions() {
        return query(`
            SELECT hq.*, u.username 
            FROM Help_Question hq 
            JOIN User u ON hq.user_id = u.user_id 
            ORDER BY hq.created_at DESC
        `);
    }

    async getChatMessages(userId = null) {
        const params = [];
        let sql = `
            SELECT 
                cm.message_id,
                cm.user_id,
                u.username,
                cm.message,
                cm.sender_type,
                cm.is_read,
                cm.created_at,
                (
                    SELECT am.message
                    FROM Chat_Message am
                    WHERE am.user_id = cm.user_id
                      AND am.sender_type = 'ADMIN'
                      AND am.created_at > cm.created_at
                    ORDER BY am.created_at ASC
                    LIMIT 1
                ) AS admin_reply,
                (
                    SELECT am.created_at
                    FROM Chat_Message am
                    WHERE am.user_id = cm.user_id
                      AND am.sender_type = 'ADMIN'
                      AND am.created_at > cm.created_at
                    ORDER BY am.created_at ASC
                    LIMIT 1
                ) AS replied_at
            FROM Chat_Message cm
            JOIN User u ON cm.user_id = u.user_id
            WHERE cm.sender_type = 'USER'
        `;

        if (userId) {
            sql += ' AND cm.user_id = ?';
            params.push(userId);
        }

        sql += ' ORDER BY cm.created_at ASC';
        return query(sql, params);
    }

    async createHelpQuestion(userId, question) {
        return query('INSERT INTO Help_Question (user_id, question) VALUES (?, ?)', [userId, question]);
    }

    async createChatMessage(userId, message) {
        return query(
            'INSERT INTO Chat_Message (user_id, message, sender_type) VALUES (?, ?, \'USER\')',
            [userId, message]
        );
    }

    async saveSocketChatMessage(userId, adminId, message, senderType) {
        return query(
            'INSERT INTO Chat_Message (user_id, admin_id, message, sender_type) VALUES (?, ?, ?, ?)',
            [userId, adminId, message, senderType]
        );
    }

    async getChatUsers() {
        return query(`
            SELECT DISTINCT u.user_id, u.username, u.email,
                   (SELECT COUNT(*) FROM Chat_Message WHERE user_id = u.user_id AND is_read = false AND sender_type = 'USER') as unread_count,
                   (SELECT MAX(created_at) FROM Chat_Message WHERE user_id = u.user_id) as last_message
            FROM User u
            JOIN Chat_Message cm ON u.user_id = cm.user_id
            ORDER BY last_message DESC
        `);
    }

    async getOriginalMessage(messageId) {
        return query(
            'SELECT user_id FROM Chat_Message WHERE message_id = ? AND sender_type = \'USER\'',
            [messageId]
        );
    }

    async createAdminReply(userId, adminId, reply) {
        return query(
            'INSERT INTO Chat_Message (user_id, admin_id, message, sender_type, is_read) VALUES (?, ?, ?, \'ADMIN\', true)',
            [userId, adminId, reply]
        );
    }

    async getHelpQuestions() {
        return query(`
            SELECT hq.*, u.username, u.email 
            FROM Help_Question hq 
            JOIN User u ON hq.user_id = u.user_id 
            ORDER BY CASE WHEN hq.answer IS NULL THEN 0 ELSE 1 END, hq.created_at DESC
        `);
    }

    async getQuestionById(questionId) {
        return query('SELECT * FROM Help_Question WHERE question_id = ?', [questionId]);
    }

    async answerQuestion(answer, adminId, questionId) {
        return query(
            'UPDATE Help_Question SET answer = ?, answered_by = ?, answered_at = NOW() WHERE question_id = ?',
            [answer, adminId, questionId]
        );
    }
}

module.exports = new HelpModel();