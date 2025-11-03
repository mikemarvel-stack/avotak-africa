import mongoose from 'mongoose';
import express from 'express';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import dashboardRoutes from './routes/dashboard.js';
import contentRoutes from './routes/content.js'; // This should now correctly point to your main content router
import dotenv from 'dotenv';
import healthRoutes from './routes/health.js'; // Import health routes
import errorHandler from './middleware/errorHandler.js'; // Import the handler
import userRoutes from './routes/userRoutes.js'; // Import user routes
import path from 'path';
import { fileURLToPath } from 'url';
import { protect } from './middleware/authMiddleware.js';
import {
  getHomeContent,
  updateHomeContent,
  getServicesContent,
  updateServicesContent,
  getAboutContent,
  updateAboutContent,
  getProduce,
  addProduce,
  updateProduce,
  deleteProduce,
  getFeaturedProduce
} from './controllers/contentController.js';
import { getGallery, addGalleryImage, deleteGalleryImage } from './controllers/galleryController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- CORS --------------------
app.use(cors({
  origin: [
    'https://avotakafrica.netlify.app', // frontend URL
    'http://localhost:5173'             // local dev
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// -------------------- MIDDLEWARE --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------- ROUTES --------------------
app.use('/api/health', healthRoutes); // Add health check route
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/users', userRoutes); // Use user routes

// --- Content Routes ---
const contentRouter = express.Router();

// Home
contentRouter.get('/home', getHomeContent);
contentRouter.put('/home', protect, updateHomeContent);

// Services
contentRouter.get('/services', getServicesContent);
contentRouter.put('/services', protect, updateServicesContent);

// About
contentRouter.get('/about', getAboutContent);
contentRouter.put('/about', protect, updateAboutContent);

// Produce
contentRouter.get('/produce/featured', getFeaturedProduce);
contentRouter.route('/produce')
  .get(getProduce)
  .post(protect, addProduce);
contentRouter.route('/produce/:id')
  .put(protect, updateProduce)
  .delete(protect, deleteProduce);

// Gallery
contentRouter.route('/gallery')
  .get(getGallery)
  .post(protect, addGalleryImage);
contentRouter.delete('/gallery/:id', protect, deleteGalleryImage);

app.use('/api/content', contentRouter);

// Health check
app.get('/', (req, res) => {
  res.send('Avotak Africa API is running successfully.');
});

// Add the error handler as the last middleware, before the DB connection
app.use(errorHandler);

// -------------------- MONGODB CONNECTION --------------------
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('❌ MONGO_URI is not defined. Set it in Render environment variables!');
  process.exit(1);
}

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('✅ MongoDB connected');
    
    // Run the seeder to populate DB if it's empty
    await seedDatabase();

    app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Serve frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend build from the 'dist' directory at the project root
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});
