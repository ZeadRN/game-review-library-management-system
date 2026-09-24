// ==========================================
// FEATURE: Event Routes
// ==========================================

const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

// Public routes
router.get('/events', eventController.getAllEvents);
router.get('/event/:id', eventController.getEventById);
router.post('/event/:id/register', eventController.registerForEvent);

// Admin routes
router.post('/admin/event/create', eventController.createEvent);
router.put('/admin/event/:id/status', eventController.updateEventStatus);
router.delete('/admin/event/:id', eventController.deleteEvent);
router.post('/admin/event/:id/results', eventController.saveEventResults);

module.exports = router;
