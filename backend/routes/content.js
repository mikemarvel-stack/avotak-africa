
import express from 'express';
import Joi from 'joi';
import asyncHandler from 'express-async-handler';
import {
  getHomeContent,
  updateHomeContent,
  getServicesContent,
  updateServicesContent,
  getProduce,
  addProduce,
  updateProduce,
  deleteProduce
} from '../controllers/contentController.js';
import { protect } from '../utils/auth.js'; // Corrected import path
import Project from '../models/Project.js';
import Gallery from '../models/Gallery.js';
import { cloudinary } from '../utils/cloudinary.js';

const router = express.Router();

// --- Validation Schemas ---

// Schema for updating home content
const homeContentSchema = Joi.object({
  heroTitle: Joi.string().required(),
  heroSubtitle: Joi.string().required(),
  // Allow other fields to be present without validation for now
}).unknown(true);

// Schema for adding/updating produce
const produceSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().optional().allow(''),
  imageUrl: Joi.string().uri().optional().allow(''),
  _id: Joi.any(), // Allow _id for updates
  id: Joi.any(),
  image: Joi.any(),
  __v: Joi.any(),
});

// --- Validation Middleware ---

const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    // Send a 400 Bad Request response if validation fails
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};


// --- Content Routes ---

// Home Page Content
router.route('/home')
  .get(getHomeContent)
  .put(protect, validateRequest(homeContentSchema), asyncHandler(updateHomeContent));

// Services Page Content
router.route('/services')
  .get(getServicesContent)
  .put(protect, asyncHandler(updateServicesContent));

// Produce Content
router.route('/produce')
  .get(getProduce)
  .post(protect, validateRequest(produceSchema), asyncHandler(addProduce));

router.route('/produce/:id')
  .put(protect, validateRequest(produceSchema), asyncHandler(updateProduce))
  .delete(protect, asyncHandler(deleteProduce));

// -------------------- PROJECTS --------------------
router.get('/projects', asyncHandler(async (req, res) => {
  const projects = await Project.find().sort('order');
  res.json(projects);
}));

router.post('/projects', protect, asyncHandler(async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json(project);
}));

router.put('/projects/:id', protect, asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  res.json(project);
}));

router.delete('/projects/:id', protect, asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  res.json({ message: 'Project removed' });
}));

// -------------------- GALLERY --------------------
router.get('/gallery', asyncHandler(async (req, res) => {
  const gallery = await Gallery.find().sort('order');
  res.json(gallery);
}));

router.post('/gallery', protect, asyncHandler(async (req, res) => {
  const item = new Gallery(req.body);
  await item.save();
  res.status(201).json(item);
}));

router.put('/gallery/:id', protect, asyncHandler(async (req, res) => {
  const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) {
    res.status(404);
    throw new Error('Gallery item not found');
  }
  res.json(item);
}));

router.delete('/gallery/:id', protect, asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) {
    res.status(404);
    throw new Error('Gallery item not found');
  }

  if (item.publicId) {
    await cloudinary.uploader.destroy(item.publicId);
  }

  await item.deleteOne();
  res.json({ message: 'Gallery item removed' });
}));

export default router;
