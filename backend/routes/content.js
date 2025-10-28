// routes/content.js
import express from 'express';
import { verifyToken } from '../utils/auth.js';
import HomeContent from '../models/HomeContent.js';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import Produce from '../models/Produce.js';
import Gallery from '../models/Gallery.js';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// -------------------- HOME --------------------
router.get('/home', async (req, res) => {
  try {
    const content = await HomeContent.findOne() || {};
    res.json(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch home content' });
  }
});

router.put('/home', verifyToken, async (req, res) => {
  try {
    let content = await HomeContent.findOne();
    if (content) {
      Object.assign(content, req.body);
      await content.save();
    } else {
      content = new HomeContent(req.body);
      await content.save();
    }
    res.json(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update home content' });
  }
});

// -------------------- SERVICES --------------------
router.get('/services', async (req, res) => {
  const services = await Service.find().sort('order');
  res.json(services);
});

router.post('/services', verifyToken, async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.put('/services/:id', verifyToken, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.delete('/services/:id', verifyToken, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// -------------------- PROJECTS --------------------
router.get('/projects', async (req, res) => {
  const projects = await Project.find().sort('order');
  res.json(projects);
});

router.post('/projects', verifyToken, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.put('/projects/:id', verifyToken, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.delete('/projects/:id', verifyToken, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// -------------------- PRODUCE --------------------
router.get('/produce', async (req, res) => {
  const produce = await Produce.find().sort('order');
  res.json(produce);
});

router.post('/produce', verifyToken, async (req, res) => {
  try {
    const item = new Produce(req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.put('/produce/:id', verifyToken, async (req, res) => {
  try {
    const item = await Produce.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.delete('/produce/:id', verifyToken, async (req, res) => {
  try {
    await Produce.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// -------------------- GALLERY --------------------
router.get('/gallery', async (req, res) => {
  try {
    const gallery = await Gallery.find().sort('order');
    res.json(gallery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch gallery items' });
  }
});

router.post('/gallery', verifyToken, async (req, res) => {
  try {
    const item = new Gallery(req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.put('/gallery/:id', verifyToken, async (req, res) => {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.delete('/gallery/:id', verifyToken, async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Gallery item not found' });

    // Delete image from Cloudinary if it exists
    if (item.publicId) await cloudinary.uploader.destroy(item.publicId);

    await item.deleteOne();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
