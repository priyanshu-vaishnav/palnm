import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Aapka Naam' },
  title: { type: String, default: 'AI Automation Specialist' },
  tagline: { type: String, default: 'Skills Seekho, Zindagi Badlo — Apni Bhi, Doosron Ki Bhi' },
  company: { type: String, default: 'RiseNova Skill Services' },
  location: { type: String, default: 'Raipur, Chhattisgarh' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  whatsapp: { type: String, default: '' },
  photo: { type: String, default: '/profile.jpeg' },
  heroVideo: { type: String, default: '' },
  rank: { type: String, default: 'Supervisor' },
  experience: { type: String, default: '2' },
  teamSize: { type: String, default: '30' },
  directTeam: { type: String, default: '10' },
  monthlyIncome: { type: String, default: '₹40,000–50,000' },
  totalEarnings: { type: String, default: '₹10 Lakh+' },
  story: { type: String, default: '' },
  personalQuote: { type: String, default: 'Skills hi asli asset hain — jo koi cheen nahi sakta.' },
  socialLinks: {
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    youtube: { type: String, default: '' },
    linkedin: { type: String, default: '' },
  },
  seoTitle: { type: String, default: 'RiseNova Skill Services — AI Automation Expert' },
  seoDescription: { type: String, default: 'AI Automation aur skills ke zariye apni zindagi badlein.' },
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
