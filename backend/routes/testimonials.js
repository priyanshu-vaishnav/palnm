import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import protect from '../middleware/auth.js';
import Testimonial from '../models/Testimonial.js';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/testimonials');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => cb(null, `testi-${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage, limits: { fileSize: 3 * 1024 * 1024 } });

// GET /api/testimonials — public
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/testimonials — admin
router.post('/', protect, upload.single('photo'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.photo = `/uploads/testimonials/${req.file.filename}`;
    const testi = await Testimonial.create(data);
    res.status(201).json(testi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/testimonials/:id — admin
router.put('/:id', protect, async (req, res) => {
  try {
    const testi = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(testi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/testimonials/:id — admin
router.delete('/:id', protect, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
