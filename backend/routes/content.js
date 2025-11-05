
import express from 'express';
import Joi from 'joi';
import asyncHandler from 'express-async-handler';

import {
  getHomeContent,
  updateHomeContent,
  getAboutContent,
  updateAboutContent,
  getServicesContent,
  updateServicesContent,
  getProduce,
  addProduce,
  updateProduce,
  deleteProduce,
  getProjects,
  updateProjects,
  addProject,
  updateProject,
  deleteProject,
  getGallery,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} from '../controllers/contentController.js';

import { protect } from '../middleware/authMiddleware.js';
import { cloudinary } from '../utils/cloudinary.js';

import HomeContent from '../models/HomeContent.js';
import Produce from '../models/Produce.js';
import Project from '../models/Project.js';
import Gallery from '../models/Gallery.js';

const router = express.Router();

// --- Validation Schemas ---

// Schema for updating home content
const homeContentSchema = Joi.object({
  hero: Joi.object({
    title: Joi.string().max(200),
    subtitle: Joi.string().max(500)
  }),
  featured: Joi.array().max(20).items(Joi.string().max(100))
}).unknown(true);

// Schema for adding/updating produce
const produceSchema = Joi.object({
  name: Joi.string().max(200).required(),
  description: Joi.string().max(2000).required(),
  imageUrl: Joi.string().uri().max(500).allow('', null),
  publicId: Joi.string().max(200).allow('', null),
  category: Joi.string().max(100),
  featured: Joi.boolean()
}).unknown(true);

// --- Validation Middleware ---

const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};


// --- Content Routes ---

// Home Page Content
router.route('/home')
  .get(asyncHandler(getHomeContent))
  .put(protect, validateRequest(homeContentSchema), asyncHandler(updateHomeContent));

// About Page Content
router.route('/about')
  .get(asyncHandler(getAboutContent))
  .put(protect, asyncHandler(updateAboutContent));

// Services Page Content
router.route('/services')
  .get(getServicesContent)
  .put(protect, asyncHandler(updateServicesContent));

// -------------------- PRODUCE --------------------
router.route('/produce')
  .get(getProduce)
  .post(protect, validateRequest(produceSchema), asyncHandler(addProduce));

// THIS IS THE NEW ROUTE
router.get('/produce/featured', asyncHandler(async (req, res) => {
  // Fetch produce items where 'featured' is true, and limit the result to 4
  const featuredProduce = await Produce.find({ featured: true }).limit(4);
  if (!featuredProduce) {
    res.status(404);
    throw new Error('No featured produce found');
  }
  res.json(featuredProduce);
}));

router.route('/produce/:id')
  .put(protect, validateRequest(produceSchema), asyncHandler(updateProduce))
  .delete(protect, asyncHandler(deleteProduce));

// -------------------- PROJECTS --------------------
router.route('/projects')
  .get(asyncHandler(getProjects))
  .put(protect, asyncHandler(updateProjects))
  .post(protect, asyncHandler(addProject));

router.route('/projects/:id')
  .put(protect, asyncHandler(updateProject))
  .delete(protect, asyncHandler(deleteProject));

// -------------------- GALLERY --------------------
router.route('/gallery')
  .get(asyncHandler(getGallery))
  .post(protect, asyncHandler(addGalleryItem));

router.route('/gallery/:id')
  .put(protect, asyncHandler(updateGalleryItem))
  .delete(protect, asyncHandler(deleteGalleryItem));

export default router;
