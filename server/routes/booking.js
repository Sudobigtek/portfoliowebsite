const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');
const { sendEmail } = require('../utils/email');
const { 
  bookingRequestTemplate, 
  bookingConfirmationTemplate 
} = require('../templates/emailTemplates');
const calendarService = require('../services/calendarService');

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookingInput'
 *     responses:
 *       201:
 *         description: Booking created successfully
 * 
 * /api/bookings/{id}/status:
 *   patch:
 *     summary: Update booking status
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, cancelled]
 */

// Get all bookings (protected - admin only)
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find().sort('-date');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings'
    });
  }
});

// Create new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    // Send confirmation email to client
    await sendEmail({
      to: booking.email,
      subject: 'Booking Request Received',
      html: bookingConfirmationTemplate({
        name: booking.name,
        date: booking.date,
        type: booking.type
      })
    });

    // Send notification to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: 'New Booking Request',
      html: bookingRequestTemplate(booking)
    });

    const calendarEvent = await calendarService.addEvent(booking);
    booking.calendarEventId = calendarEvent.id;
    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking request submitted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating booking'
    });
  }
});

// Update booking status (protected)
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.status = status;
    await booking.save();

    // Send status update email to client
    await sendEmail({
      to: booking.email,
      subject: `Booking ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      html: bookingStatusTemplate({
        name: booking.name,
        date: booking.date,
        type: booking.type,
        status
      })
    });

    if (booking.calendarEventId) {
      await calendarService.updateEvent(booking.calendarEventId, booking);
    }

    res.json({
      success: true,
      message: 'Booking status updated'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating booking status'
    });
  }
});

// Delete booking (protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.calendarEventId) {
      await calendarService.deleteEvent(booking.calendarEventId);
    }

    await booking.remove();
    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting booking'
    });
  }
});

module.exports = router; 