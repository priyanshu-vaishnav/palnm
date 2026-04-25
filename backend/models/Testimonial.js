import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, default: '' },
  photo: { type: String, default: '' },
  text: { type: String, required: true },
  income: { type: String, default: '' }, // e.g. "₹50,000/month"
  rank: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
