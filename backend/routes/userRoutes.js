
import express from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../utils/auth.js';

const router = express.Router();

// Function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Email and password required');
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      res.status(400);
      throw new Error('Invalid input format');
    }

    if (email.length > 255 || password.length > 255) {
      res.status(400);
      throw new Error('Input too long');
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  })
);

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('All fields required');
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      res.status(400);
      throw new Error('Invalid input format');
    }

    if (name.length > 100 || email.length > 255 || password.length > 255) {
      res.status(400);
      throw new Error('Input too long');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  })
);

export default router;
