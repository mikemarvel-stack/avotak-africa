
import mongoose from 'mongoose';
import express from 'express';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import dashboardRoutes from './routes/dashboard.js';
import contentRoutes from './routes/content.js';
import uploadRoutes from './routes/upload.js';
import dotenv from 'dotenv';
import healthRoutes from './routes/health.js';
import errorHandler from './middleware/errorHandler.js';
import userRoutes from './routes/userRoutes.js';
import { loginLimiter, apiLimiter } from './middleware/rateLimiter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { protect } from './middleware/authMiddleware.js';

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
app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(mongoSanitize());

// -------------------- ROUTES --------------------
app.use('/api/health', healthRoutes);
app.use('/api/auth', loginLimiter, authRoutes);
app.use('/api/dashboard', apiLimiter, dashboardRoutes);
app.use('/api/content', apiLimiter, contentRoutes);
app.use('/api/users', apiLimiter, userRoutes);
app.use('/api', apiLimiter, uploadRoutes);

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
    
    // REMOVED: Seeder should not run on every server start in production.
    // It should be run manually or as a one-time setup job.

    app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Serve frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.resolve(__dirname, '../dist');
const indexPath = path.resolve(distPath, 'index.html');

app.use(express.static(distPath, {
  maxAge: '1d',
  etag: true
}));

app.get('*', (req, res) => {
  const safePath = path.normalize(indexPath).replace(/^(\.\.[\/\\])+/, '');
  res.sendFile(safePath);
});
