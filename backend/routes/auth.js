import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  if (email !== ADMIN_EMAIL)
    return res.status(401).json({ message: 'Invalid email' });

  if (password !== ADMIN_PASSWORD)
    return res.status(401).json({ message: 'Invalid password' });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '2h' });

  return res.json({ success: true, token });
});

export default router;
