import express from 'express';
import { verifyToken } from '../utils/auth.js';
import HomeContent from '../models/HomeContent.js';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import Produce from '../models/Produce.js';
import Gallery from '../models/Gallery.js';

const router = express.Router();

// Home Content Routes
router.get('/home', async (req, res) => {
  const content = await HomeContent.findOne() || {};
  res.json(content);
});

router.put('/home', verifyToken, async (req, res) => {
  const content = await HomeContent.findOne();
  if (content) {
    Object.assign(content, req.body);
    await content.save();
  } else {
    const newContent = new HomeContent(req.body);
    await newContent.save();
  }
  res.json(content);
});

// Services Routes
router.get('/services', async (req, res) => {
  const services = await Service.find().sort('order');
  res.json(services);
});

router.post('/services', verifyToken, async (req, res) => {
  const service = new Service(req.body);
  await service.save();
  res.json(service);
});

router.put('/services/:id', verifyToken, async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(service);
});

router.delete('/services/:id', verifyToken, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Projects Routes
router.get('/projects', async (req, res) => {
  const projects = await Project.find().sort('order');
  res.json(projects);
});

router.post('/projects', verifyToken, async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.json(project);
});

router.put('/projects/:id', verifyToken, async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
});

router.delete('/projects/:id', verifyToken, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Produce Routes
router.get('/produce', async (req, res) => {
  const produce = await Produce.find().sort('order');
  res.json(produce);
});

router.post('/produce', verifyToken, async (req, res) => {
  const produce = new Produce(req.body);
  await produce.save();
  res.json(produce);
});

router.put('/produce/:id', verifyToken, async (req, res) => {
  const produce = await Produce.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(produce);
});

router.delete('/produce/:id', verifyToken, async (req, res) => {
  await Produce.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Gallery Routes
router.get('/gallery', async (req, res) => {
  const gallery = await Gallery.find().sort('order');
  res.json(gallery);
});

router.post('/gallery', verifyToken, async (req, res) => {
  const item = new Gallery(req.body);
  await item.save();
  res.json(item);
});

router.put('/gallery/:id', verifyToken, async (req, res) => {
  const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

router.delete('/gallery/:id', verifyToken, async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;