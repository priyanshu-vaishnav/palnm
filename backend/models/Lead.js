import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  city: { type: String, default: '' },
  message: { type: String, default: '' },
  source: { type: String, default: 'portfolio' }, // portfolio, whatsapp, referral
  status: {
    type: String,
    enum: ['new', 'contacted', 'interested', 'joined', 'not_interested'],
    default: 'new'
  },
  notes: { type: String, default: '' },
  followUpDate: { type: Date },
  utmSource: { type: String, default: '' },
  utmMedium: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Lead', leadSchema);
