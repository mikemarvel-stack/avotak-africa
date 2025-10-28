
import express from 'express';
import {
  getHomeContent,
  updateHomeContent,
  getGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getServices,
  createService,
  updateService,
  deleteService,
  getAboutContent,
  updateAboutContent,
} from '../controllers/contentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Home Page Content
router.route('/home').get(getHomeContent).put(protect, updateHomeContent);

// About Page Content
router.route('/about').get(getAboutContent).put(protect, updateAboutContent);

// Gallery
router.route('/gallery').get(getGallery).post(protect, createGalleryItem);
router.route('/gallery/:id').put(protect, updateGalleryItem).delete(protect, deleteGalleryItem);

// Projects
router.route('/projects').get(getProjects).post(protect, createProject);
router.route('/projects/:id').put(protect, updateProject).delete(protect, deleteProject);

// Services
router.route('/services').get(getServices).post(protect, createService);
router.route('/services/:id').put(protect, updateService).delete(protect, deleteService);
