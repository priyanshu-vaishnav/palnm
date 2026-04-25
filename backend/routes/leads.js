import express from 'express';
import protect from '../middleware/auth.js';
import Lead from '../models/Lead.js';

const router = express.Router();

// POST /api/leads — public (portfolio form submit)
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, city, message, utmSource, utmMedium } = req.body;
    if (!name || !phone) return res.status(400).json({ message: 'Naam aur phone number zaroori hai' });

    const lead = await Lead.create({ name, phone, email, city, message, utmSource, utmMedium });
    res.status(201).json({ message: 'Aapka message mil gaya! Hum jald contact karenge.', id: lead._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/leads/stats — dashboard stats (MUST be before /:id route)
router.get('/stats', protect, async (req, res) => {
  try {
    const total = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: 'new' });
    const joined = await Lead.countDocuments({ status: 'joined' });
    const interested = await Lead.countDocuments({ status: 'interested' });
    res.json({ total, newLeads, joined, interested });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/leads — admin only
router.get('/', protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Lead.countDocuments(filter);
    res.json({ leads, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/leads/:id — update status/notes
router.put('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/leads/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
