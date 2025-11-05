import express from 'express';
import Gallery from '../models/gallery.js';
import { verifyToken } from '../utils/auth.js';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const items = await Gallery.find().sort('order');
    res.json(items);
  } catch (error) {
    console.error('Failed to fetch gallery items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new gallery item
router.post('/', verifyToken, async (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ message: 'Invalid request body' });
    }
    const newItem = new Gallery(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Failed to create gallery item:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update gallery item
router.put('/:id', verifyToken, async (req, res) => {
  try {
    if (!req.params.id || !/^[a-f\d]{24}$/i.test(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ message: 'Invalid request body' });
    }
    const item = await Gallery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error('Failed to update gallery item:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete gallery item
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    if (!req.params.id || !/^[a-f\d]{24}$/i.test(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Delete image from Cloudinary
    if (item.publicId) {
      await cloudinary.uploader.destroy(item.publicId);
    }

    await item.deleteOne();
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Failed to delete gallery item:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;