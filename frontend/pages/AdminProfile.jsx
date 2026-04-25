import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function AdminProfile() {
  const { getToken } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    axios.get('/api/profile').then(r => setProfile(r.data)).catch(() => toast.error('Profile load nahi hua'));
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const h = { Authorization: `Bearer ${getToken()}` };
      // Upload photo if selected
      if (photoFile) {
        const fd = new FormData();
        fd.append('photo', photoFile);
        const pr = await axios.post('/api/profile/photo', fd, { headers: { ...h, 'Content-Type': 'multipart/form-data' } });
        setProfile(p => ({ ...p, photo: pr.data.photo }));
        setPhotoFile(null);
      }
      await axios.put('/api/profile', profile, { headers: h });
      toast.success('Profile save ho gaya! ✅');
    } catch { toast.error('Save nahi hua, dobara try karein'); }
    finally { setLoading(false); }
  };

  const set = (key, val) => setProfile(p => ({ ...p, [key]: val }));
  const setSocial = (key, val) => setProfile(p => ({ ...p, socialLinks: { ...p.socialLinks, [key]: val } }));

  const onPhotoChange = (e) => {
    const f = e.target.files[0];
    if (f) { setPhotoFile(f); setPhotoPreview(URL.createObjectURL(f)); }
  };

  if (!profile) return <div style={{ color: '#A09880', padding: '2rem' }}>Loading...</div>;

  const Field = ({ label, field, type = 'text', hint }) => (
    <div>
      <label>{label}{hint && <span style={{ color: '#5A5848', fontWeight: 400, fontSize: '0.75rem' }}> — {hint}</span>}</label>
      <input type={type} value={profile[field] || ''} onChange={e => set(field, e.target.value)} />
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginBottom: '0.3rem' }}>Profile Edit</h1>
          <p style={{ color: '#A09880', fontSize: '0.85rem' }}>Madam ki details update karein</p>
        </div>
        <button className="btn-primary" onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save Karein ✓'}</button>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {/* Photo Upload */}
        <div style={{ background: '#12121A', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 16, padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1rem', fontSize: '1.1rem' }}>Profile Photo</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', border: '2px solid rgba(201,168,76,0.3)', overflow: 'hidden', flexShrink: 0 }}>
              {(photoPreview || profile.photo) ? (
                <img src={photoPreview || profile.photo} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', background: '#1A1A28', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontSize: 32, color: '#C9A84C' }}>
                  {profile.name?.[0] || 'S'}
                </div>
              )}
            </div>
            <div>
              <label style={{ color: '#C9A84C', cursor: 'pointer', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', padding: '8px 20px', borderRadius: 8 }}>
                Photo Choose Karein
                <input type="file" accept="image/*" onChange={onPhotoChange} style={{ display: 'none' }} />
              </label>
              <p style={{ color: '#5A5848', fontSize: '0.75rem', marginTop: '0.4rem' }}>Max 5MB, JPG/PNG/WebP</p>
              {photoFile && <p style={{ color: '#4CAF7C', fontSize: '0.78rem', marginTop: '0.3rem' }}>✓ {photoFile.name} — Save karne par upload hoga</p>}
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div style={{ background: '#12121A', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 16, padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.2rem', fontSize: '1.1rem' }}>Basic Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <Field label="Poora Naam *" field="name" />
            <Field label="Designation / Title" field="title" />
            <Field label="Rank" field="rank" hint="e.g. Diamond Leader" />
            <Field label="Company ka Naam" field="company" />
            <Field label="Location" field="location" hint="e.g. Raipur, CG" />
            <Field label="Tagline" field="tagline" />
          </div>
        </div>

        {/* Stats */}
        <div style={{ background: '#12121A', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 16, padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.2rem', fontSize: '1.1rem' }}>Stats (Hero mein dikhenge)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <Field label="Experience (saal)" field="experience" hint="e.g. 7" />
            <Field label="Team Size" field="teamSize" hint="e.g. 5000+" />
            <Field label="Monthly Income" field="monthlyIncome" hint="e.g. ₹2,00,000+" />
            <Field label="Total Earnings" field="totalEarnings" hint="e.g. ₹50L+" />
          </div>
        </div>

        {/* Contact */}
        <div style={{ background: '#12121A', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 16, padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.2rem', fontSize: '1.1rem' }}>Contact Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <Field label="Phone Number" field="phone" />
            <Field label="Email" field="email" type="email" />
            <Field label="WhatsApp Number" field="whatsapp" hint="country code ke saath, e.g. 919876543210" />
          </div>
        </div>

        {/* Social Links */}
        <div style={{ background: '#12121A', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 16, padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.2rem', fontSize: '1.1rem' }}>Social Media Links</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {['instagram', 'facebook', 'youtube', 'linkedin'].map(s => (
              <div key={s}>
                <label style={{ textTransform: 'capitalize' }}>{s} URL</label>
                <input value={profile.socialLinks?.[s] || ''} onChange={e => setSocial(s, e.target.value)} placeholder={`https://${s}.com/...`} />
              </div>
            ))}
          </div>
        </div>

        {/* Story */}
        <div style={{ background: '#12121A', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 16, padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.2rem', fontSize: '1.1rem' }}>Apni Kahani (Story Section)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label>Personal Quote</label>
              <input value={profile.personalQuote || ''} onChange={e => set('personalQuote', e.target.value)} placeholder="Aapka ek powerful personal quote..." />
            </div>
            <div>
              <label>Apni Story Likhein</label>
              <textarea value={profile.story || ''} onChange={e => set('story', e.target.value)} rows={8} placeholder="Apni journey ki kahani... paragraphs ke beech do baar Enter dabayein." style={{ resize: 'vertical' }} />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div style={{ background: '#12121A', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 16, padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '1.2rem', fontSize: '1.1rem' }}>SEO Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Field label="Page Title (browser tab mein dikhega)" field="seoTitle" />
            <div>
              <label>Meta Description</label>
              <textarea value={profile.seoDescription || ''} onChange={e => set('seoDescription', e.target.value)} rows={3} placeholder="Google search mein description..." style={{ resize: 'vertical' }} />
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <button className="btn-primary" onClick={handleSave} disabled={loading} style={{ minWidth: 180, justifyContent: 'center' }}>
            {loading ? 'Saving...' : '✓ Sab Kuch Save Karein'}
          </button>
        </div>
      </div>
    </div>
  );
}
