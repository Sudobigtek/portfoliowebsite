const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/auth');
const Portfolio = require('../models/Portfolio');
const { uploadImage, deleteImage } = require('../config/cloudinary');

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * /api/portfolio:
 *   get:
 *     summary: Get all portfolio items
 *     tags: [Portfolio]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *     responses:
 *       200:
 *         description: List of portfolio items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PortfolioItem'
 *   post:
 *     summary: Create a new portfolio item
 *     tags: [Portfolio]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/PortfolioInput'
 *     responses:
 *       201:
 *         description: Portfolio item created
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PortfolioItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         category:
 *           type: string
 *         imageUrl:
 *           type: string
 *         description:
 *           type: string
 */

// Get all portfolio items
router.get('/', async (req, res) => {
  try {
    const items = await Portfolio.find().sort('order');
    res.json(items);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching portfolio items'
    });
  }
});

// Add new portfolio item (protected)
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an image'
      });
    }

    // Upload image to Cloudinary
    const imageUrls = await uploadImage(req.file);

    // Get the highest order number
    const lastItem = await Portfolio.findOne().sort('-order');
    const order = lastItem ? lastItem.order + 1 : 0;

    const portfolio = new Portfolio({
      title: req.body.title,
      category: req.body.category,
      photographer: req.body.photographer,
      client: req.body.client,
      date: req.body.date,
      images: imageUrls,
      order
    });

    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    console.error('Portfolio creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating portfolio item'
    });
  }
});

// Update portfolio item (protected)
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    // Update image if provided
    if (req.file) {
      // Delete old image from Cloudinary
      if (portfolio.images.public_id) {
        await deleteImage(portfolio.images.public_id);
      }
      // Upload new image
      portfolio.images = await uploadImage(req.file);
    }

    // Update other fields
    portfolio.title = req.body.title || portfolio.title;
    portfolio.category = req.body.category || portfolio.category;
    portfolio.photographer = req.body.photographer || portfolio.photographer;
    portfolio.client = req.body.client || portfolio.client;
    portfolio.date = req.body.date || portfolio.date;

    await portfolio.save();
    res.json(portfolio);
  } catch (error) {
    console.error('Portfolio update error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating portfolio item'
    });
  }
});

// Delete portfolio item (protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio item not found'
      });
    }

    // Delete image from Cloudinary
    if (portfolio.images.public_id) {
      await deleteImage(portfolio.images.public_id);
    }

    await portfolio.remove();
    res.json({ success: true, message: 'Portfolio item deleted' });
  } catch (error) {
    console.error('Portfolio deletion error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting portfolio item'
    });
  }
});

module.exports = router; 