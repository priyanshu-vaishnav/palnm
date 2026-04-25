import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  icon: { type: String, default: '🏆' },
  title: { type: String, required: true },
  value: { type: String, required: true }, // e.g. "Diamond", "5000+", "₹2L+"
  description: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Achievement', achievementSchema);
