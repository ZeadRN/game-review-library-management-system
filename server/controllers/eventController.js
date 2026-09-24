// ==========================================
// FEATURE: Event Controller
// ==========================================

const eventModel = require('../models/eventModel');
const NotificationController = require('./notificationController');

async function getAllEvents(req, res) {
    try {
        const events = await eventModel.getAllEvents();
        res.json({ success: true, events });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching events' });
    }
}

async function getEventById(req, res) {
    try {
        const events = await eventModel.getEventById(req.params.id);
        if (events.length === 0) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        const registrations = await eventModel.getEventRegistrations(req.params.id);

        let userRegistered = false;
        if (req.session.user && req.session.user.type === 'user') {
            userRegistered = await eventModel.checkUserRegistration(req.params.id, req.session.user.id);
        }

        res.json({ success: true, event: events[0], registrations, userRegistered });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching event' });
    }
}

async function registerForEvent(req, res) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'User login required' });
    }

    try {
        const events = await eventModel.getEventById(req.params.id);
        if (events.length === 0) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        const event = events[0];
        const now = new Date();
        if (new Date(event.end_date) <= now) {
            return res.status(400).json({ success: false, message: 'This event has ended' });
        }
        if (event.status !== 'UPCOMING' && event.status !== 'ONGOING') {
            return res.status(400).json({ success: false, message: 'Registration closed' });
        }

        if (event.max_participants) {
            const count = await eventModel.getEventRegistrationCount(req.params.id);
            if (count >= event.max_participants) {
                return res.status(400).json({ success: false, message: 'Event is full' });
            }
        }

        await eventModel.registerForEvent(req.params.id, req.session.user.id);
        res.json({ success: true, message: 'Registered successfully' });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: 'Already registered' });
        }
        res.status(500).json({ success: false, message: 'Error registering' });
    }
}

async function createEvent(req, res) {
    if (!req.session.user || req.session.user.type !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const { title, description, eventType, startDate, endDate, eventDate, maxParticipants, prizes, bannerImage } = req.body;

    const start = startDate || eventDate;
    const end = endDate || eventDate;
    const type = eventType || 'SALE';

    if (!title || !start || !end || new Date(end) <= new Date(start)) {
        return res.status(400).json({ success: false, message: 'A valid start and end date are required' });
    }

    if (!['TOURNAMENT', 'SALE', 'GIVEAWAY', 'MEETUP'].includes(type)) {
        return res.status(400).json({ success: false, message: 'Invalid event type' });
    }

    try {
        const result = await eventModel.createEvent(
            title, description, type, start, end, maxParticipants, prizes, bannerImage, req.session.user.id
        );

        const users = await eventModel.getAllUsers();
        for (const user of users) {
            await NotificationController.sendNotification(req, user.user_id, 'EVENT',
                'New Event!',
                `${title} - ${description ? description.substring(0, 50) : ''}...`,
                '/events'
            );
        }

        res.json({ success: true, message: 'Event created', eventId: result.insertId });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error creating event' });
    }
}

async function updateEventStatus(req, res) {
    if (!req.session.user || req.session.user.type !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const { status } = req.body;

    if (!['UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid event status' });
    }

    try {
        await eventModel.updateEventStatus(req.params.id, status);

        const registrations = await eventModel.getEventRegistrationsByEventId(req.params.id);
        const event = await eventModel.getEventTitle(req.params.id);

        for (const reg of registrations) {
            await NotificationController.sendNotification(req, reg.user_id, 'EVENT',
                'Event Update',
                `"${event.title}" is now ${status.toLowerCase()}`,
                '/events'
            );
        }

        res.json({ success: true, message: 'Status updated' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error updating status' });
    }
}

async function deleteEvent(req, res) {
    if (!req.session.user || req.session.user.type !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    try {
        await eventModel.deleteEventRegistrations(req.params.id);
        await eventModel.deleteEvent(req.params.id);
        res.json({ success: true, message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error deleting event' });
    }
}

async function saveEventResults(req, res) {
    if (!req.session.user || req.session.user.type !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const { results } = req.body;

    try {
        await eventModel.updateEventResults(req.params.id, results);
        res.json({ success: true, message: 'Results saved' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error saving results' });
    }
}

module.exports = {
    getAllEvents,
    getEventById,
    registerForEvent,
    createEvent,
    updateEventStatus,
    deleteEvent,
    saveEventResults
};
