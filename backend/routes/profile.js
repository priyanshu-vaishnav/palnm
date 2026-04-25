import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import protect from '../middleware/auth.js';
import Profile from '../models/Profile.js';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/profile');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => cb(null, `profile-${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// GET /api/profile — public
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Create default profile if none exists
      profile = await Profile.create({});
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/profile — admin only
router.put('/', protect, async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      Object.assign(profile, req.body);
      await profile.save();
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/profile/photo — upload profile photo
router.post('/photo', protect, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Koi photo nahi mili' });
    const photoUrl = `/uploads/profile/${req.file.filename}`;
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({ photo: photoUrl });
    } else {
      profile.photo = photoUrl;
      await profile.save();
    }
    res.json({ photo: photoUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
