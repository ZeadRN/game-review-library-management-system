// ==========================================
// FEATURE: Community Model
// ==========================================

const { query } = require('../config/db');

class CommunityModel {
    async getAllThreads(sort = null) {
        let orderBy = 't.is_pinned DESC, t.created_at DESC';
        if (sort === 'popular') {
            orderBy = 't.is_pinned DESC, t.upvote_count DESC';
        }

        return query(`
            SELECT t.*, u.username,
                   (SELECT COUNT(*) FROM Thread_Comment WHERE thread_id = t.thread_id) as comment_count
            FROM Thread t 
            JOIN User u ON t.user_id = u.user_id 
            ORDER BY ${orderBy}
        `);
    }

    async getThreadById(threadId) {
        return query(`
            SELECT t.*, u.username 
            FROM Thread t 
            JOIN User u ON t.user_id = u.user_id 
            WHERE t.thread_id = ?
        `, [threadId]);
    }

    async getThreadComments(threadId) {
        return query(`
            SELECT c.*, u.username 
            FROM Thread_Comment c 
            JOIN User u ON c.user_id = u.user_id 
            WHERE c.thread_id = ? 
            ORDER BY c.upvote_count DESC, c.created_at ASC
        `, [threadId]);
    }

    async checkUserThreadUpvote(threadId, userId) {
        const result = await query(
            'SELECT * FROM Thread_Upvote WHERE thread_id = ? AND user_id = ?',
            [threadId, userId]
        );
        return result.length > 0;
    }

    async createThread(title, content, userId) {
        return query(
            'INSERT INTO Thread (title, content, user_id) VALUES (?, ?, ?)',
            [title, content, userId]
        );
    }

    async removeThreadUpvote(threadId, userId) {
        await query('DELETE FROM Thread_Upvote WHERE thread_id = ? AND user_id = ?', [threadId, userId]);
        await query('UPDATE Thread SET upvote_count = upvote_count - 1 WHERE thread_id = ?', [threadId]);
    }

    async addThreadUpvote(threadId, userId) {
        await query('INSERT INTO Thread_Upvote (thread_id, user_id) VALUES (?, ?)', [threadId, userId]);
        await query('UPDATE Thread SET upvote_count = upvote_count + 1 WHERE thread_id = ?', [threadId]);
    }

    async createComment(threadId, commentText, userId) {
        return query(
            'INSERT INTO Thread_Comment (thread_id, comment_text, user_id) VALUES (?, ?, ?)',
            [threadId, commentText, userId]
        );
    }

    async getThreadAuthor(threadId) {
        const result = await query('SELECT * FROM Thread WHERE thread_id = ?', [threadId]);
        return result.length > 0 ? result[0] : null;
    }

    async checkUserCommentUpvote(commentId, userId) {
        const result = await query(
            'SELECT * FROM Comment_Upvote WHERE comment_id = ? AND user_id = ?',
            [commentId, userId]
        );
        return result.length > 0;
    }

    async removeCommentUpvote(commentId, userId) {
        await query('DELETE FROM Comment_Upvote WHERE comment_id = ? AND user_id = ?', [commentId, userId]);
        await query('UPDATE Thread_Comment SET upvote_count = upvote_count - 1 WHERE comment_id = ?', [commentId]);
    }

    async addCommentUpvote(commentId, userId) {
        await query('INSERT INTO Comment_Upvote (comment_id, user_id) VALUES (?, ?)', [commentId, userId]);
        await query('UPDATE Thread_Comment SET upvote_count = upvote_count + 1 WHERE comment_id = ?', [commentId]);
    }
}

module.exports = new CommunityModel();