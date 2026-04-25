import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Hardcoded admin (or use a User model for production)
const ADMIN = {
  email: process.env.ADMIN_EMAIL,
  // Store hashed password in .env in production
  password: process.env.ADMIN_PASSWORD,
};

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email aur password daalein' });

  if (email !== ADMIN.email || password !== ADMIN.password) {
    return res.status(401).json({ message: 'Email ya password galat hai' });
  }

  const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, message: 'Login successful' });
});

// POST /api/auth/verify
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ valid: false });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true });
  } catch {
    res.status(401).json({ valid: false });
  }
});

export default router;
