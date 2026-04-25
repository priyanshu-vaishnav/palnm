import express from 'express';
import nodemailer from 'nodemailer';
import Lead from '../models/Lead.js';

const router = express.Router();

// POST /api/contact — portfolio contact form (also saves as lead)
router.post('/', async (req, res) => {
  const { name, phone, email, city, message } = req.body;
  if (!name || !phone) return res.status(400).json({ message: 'Naam aur phone zaroori hai' });

  try {
    // Save as lead
    await Lead.create({ name, phone, email, city, message, source: 'contact_form' });

    // Send email notification (optional - works if EMAIL_USER set)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `🔔 Naya Lead: ${name}`,
        html: `
          <h2>Naya Contact Form Submission</h2>
          <p><strong>Naam:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email || 'N/A'}</p>
          <p><strong>City:</strong> ${city || 'N/A'}</p>
          <p><strong>Message:</strong> ${message || 'N/A'}</p>
        `
      });
    }

    res.json({ message: 'Shukriya! Hum aapko jald contact karenge. 🙏' });
  } catch (err) {
    res.status(500).json({ message: 'Kuch galat hua, dobara try karein' });
  }
});

export default router;
