// ==========================================
// FEATURE: Event Model
// ==========================================

const { query } = require('../config/db');

class EventModel {
    async getAllEvents() {
        return query(`
            SELECT e.*, 
                   (SELECT COUNT(*) FROM Event_Registration WHERE event_id = e.event_id) as participant_count
            FROM Event e 
            ORDER BY 
                CASE e.status 
                    WHEN 'ONGOING' THEN 1 
                    WHEN 'UPCOMING' THEN 2 
                    WHEN 'COMPLETED' THEN 3 
                    ELSE 4 
                END,
                e.start_date ASC
        `);
    }

    async getEventById(eventId) {
        return query('SELECT * FROM Event WHERE event_id = ?', [eventId]);
    }

    async getEventRegistrations(eventId) {
        return query(`
            SELECT er.*, u.username 
            FROM Event_Registration er 
            JOIN User u ON er.user_id = u.user_id 
            WHERE er.event_id = ? 
            ORDER BY er.placement ASC, er.registered_at ASC
        `, [eventId]);
    }

    async checkUserRegistration(eventId, userId) {
        const result = await query(
            'SELECT * FROM Event_Registration WHERE event_id = ? AND user_id = ?',
            [eventId, userId]
        );
        return result.length > 0;
    }

    async getEventRegistrationCount(eventId) {
        const result = await query(
            'SELECT COUNT(*) as count FROM Event_Registration WHERE event_id = ?',
            [eventId]
        );
        return result[0].count;
    }

    async registerForEvent(eventId, userId) {
        return query(
            'INSERT INTO Event_Registration (event_id, user_id) VALUES (?, ?)',
            [eventId, userId]
        );
    }

    async createEvent(title, description, eventType, startDate, endDate, maxParticipants, prizes, bannerImage, createdBy) {
        return query(
            `INSERT INTO Event (title, description, event_type, start_date, end_date, max_participants, prizes, banner_image, created_by) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, description, eventType, startDate, endDate, maxParticipants || null, prizes || null, bannerImage || null, createdBy]
        );
    }

    async updateEventStatus(eventId, status) {
        return query('UPDATE Event SET status = ? WHERE event_id = ?', [status, eventId]);
    }

    async getEventRegistrationsByEventId(eventId) {
        return query('SELECT user_id FROM Event_Registration WHERE event_id = ?', [eventId]);
    }

    async getEventTitle(eventId) {
        const result = await query('SELECT title FROM Event WHERE event_id = ?', [eventId]);
        return result.length > 0 ? result[0] : null;
    }

    async deleteEventRegistrations(eventId) {
        return query('DELETE FROM Event_Registration WHERE event_id = ?', [eventId]);
    }

    async deleteEvent(eventId) {
        return query('DELETE FROM Event WHERE event_id = ?', [eventId]);
    }

    async updateEventResults(eventId, results) {
        for (const result of results) {
            await query(
                'UPDATE Event_Registration SET placement = ? WHERE event_id = ? AND user_id = ?',
                [result.placement, eventId, result.userId]
            );
        }
        return query("UPDATE Event SET status = 'COMPLETED' WHERE event_id = ?", [eventId]);
    }

    async getAllUsers() {
        return query('SELECT user_id FROM User');
    }
}

module.exports = new EventModel();