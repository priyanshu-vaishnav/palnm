import express from 'express';
import protect from '../middleware/auth.js';
import Achievement from '../models/Achievement.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find({ isActive: true }).sort({ order: 1 });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const ach = await Achievement.create(req.body);
    res.status(201).json(ach);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const ach = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ach);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Achievement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
