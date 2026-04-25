import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaWhatsapp, FaInstagram, FaFacebook, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact({ profile }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.phone) return toast.error('Naam aur phone zaroori hai!');
    setLoading(true);
    try {
      const res = await axios.post('/api/contact', form);
      toast.success(res.data.message);
      setForm({ name: '', phone: '', email: '', city: '', message: '' });
    } catch {
      toast.error('Kuch galat hua, dobara try karein');
    } finally { setLoading(false); }
  };

  return (
    <section id="contact" style={{ padding: '6rem 1.5rem', background: '#12121A' }}>
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p className="section-label">Aaj Hi Judein</p>
          <h2 className="section-title">Apna <span className="gold-text">Safar Shuroo</span> Karein</h2>
          <p style={{ color: '#A09880', maxWidth: 480, margin: '0 auto' }}>Form bharen — main personally aapko 24 ghante mein contact karungi.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'start' }}>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}
            style={{ background: 'linear-gradient(135deg, #1A1A28, #12101E)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 20, padding: '2rem' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', marginBottom: '1.5rem', color: '#F0D080' }}>Free Consultation Lijiye</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label>Name *</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Poora naam likhein" />
              </div>
              <div>
                <label>Phone Number *</label>
                <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+91 XXXXX XXXXX" type="tel" />
              </div>
              <div>
                <label>Email (optional)</label>
                <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="aapka@email.com" type="email" />
              </div>
              <div>
                <label>Aapka Shehar</label>
                <input value={form.city} onChange={e => setForm({...form, city: e.target.value})} placeholder="City ka naam" />
              </div>
              <div>
                <label>Kuch Kehna Hai? (optional)</label>
                <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Apne sawaal ya message likhein..." rows={3} style={{ resize: 'vertical' }} />
              </div>
              <button className="btn-primary" onClick={handleSubmit} disabled={loading} style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Bhej rahe hain...' : 'Message Bhejein 🚀'}
              </button>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}>
            {/* Personal quote */}
            <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderLeft: '3px solid #C9A84C', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontStyle: 'italic', color: '#F0D080', lineHeight: 1.7 }}>
                "{profile?.personalQuote || 'Safalta ka raasta mushkil nahi, sirf alag hai.'}"
              </p>
              <p style={{ color: '#A09880', fontSize: '0.8rem', marginTop: '0.8rem' }}>— {profile?.name}</p>
            </div>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {profile?.phone && (
                <a href={`tel:${profile.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#C0B8AC', textDecoration: 'none' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A84C', flexShrink: 0 }}><FaPhone /></div>
                  <span>{profile.phone}</span>
                </a>
              )}
              {profile?.email && (
                <a href={`mailto:${profile.email}`} style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#C0B8AC', textDecoration: 'none' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A84C', flexShrink: 0 }}><FaEnvelope /></div>
                  <span>{profile.email}</span>
                </a>
              )}
              {profile?.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#C0B8AC' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A84C', flexShrink: 0 }}><FaMapMarkerAlt /></div>
                  <span>{profile.location}</span>
                </div>
              )}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              {profile?.whatsapp && (
                <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(76,175,124,0.1)', border: '1px solid rgba(76,175,124,0.3)', color: '#4CAF7C', padding: '10px 18px', borderRadius: 50, fontSize: '0.85rem', textDecoration: 'none' }}>
                  <FaWhatsapp /> WhatsApp
                </a>
              )}
              {profile?.socialLinks?.instagram && (
                <a href={profile.socialLinks.instagram} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '10px 18px', fontSize: '0.85rem', gap: 8 }}>
                  <FaInstagram /> Instagram
                </a>
              )}
              {profile?.socialLinks?.facebook && (
                <a href={profile.socialLinks.facebook} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: '10px 18px', fontSize: '0.85rem', gap: 8 }}>
                  <FaFacebook /> Facebook
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
