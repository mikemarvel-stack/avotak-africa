
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
import { protect } from '../middleware/authMiddleware.js';

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
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort('order');
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
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

    if (item.publicId) await cloudinary.uploader.destroy(item.publicId);

    await item.deleteOne();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
