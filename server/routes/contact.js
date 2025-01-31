const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const sendEmail = require('../config/email');
const { contactLimiter } = require('../middleware/rateLimiter');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Send a contact message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 * 
 * /api/contact/messages:
 *   get:
 *     summary: Get all contact messages
 *     tags: [Contact]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [new, read, replied]
 *         description: Filter messages by status
 *     responses:
 *       200:
 *         description: List of contact messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContactMessage'
 * 
 * /api/contact/messages/{id}:
 *   patch:
 *     summary: Update message status
 *     tags: [Contact]
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
 *                 enum: [read, replied]
 *     responses:
 *       200:
 *         description: Message status updated
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ContactMessage:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         subject:
 *           type: string
 *         message:
 *           type: string
 *         status:
 *           type: string
 *           enum: [new, read, replied]
 *         createdAt:
 *           type: string
 *           format: date-time
 */

// Apply rate limiting to contact route
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Create contact entry
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    await contact.save();
    
    // Send notification email
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully' 
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again.' 
    });
  }
});

// Protected routes for admin
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Contact.find().sort('-date');
    res.json(messages);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching messages'
    });
  }
});

router.patch('/:id', protect, async (req, res) => {
  try {
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating message'
    });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting message'
    });
  }
});

module.exports = router; 