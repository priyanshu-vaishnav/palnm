import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { FaPlus, FaTrash, FaEdit, FaTimes, FaCheck } from 'react-icons/fa';

const emptyForm = { name: '', city: '', text: '', income: '', rank: '', isActive: true, order: 0 };

export default function AdminTestimonials() {
  const { getToken } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);

  const headers = () => ({ Authorization: `Bearer ${getToken()}` });

  const fetchAll = async () => {
    setLoading(true);
    try {
      const r = await axios.get('/api/testimonials', { headers: headers() });
      setTestimonials(r.data);
    } catch { toast.error('Load nahi hua'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setPhotoFile(null); setShowForm(true); };
  const openEdit = (t) => { setForm({ name: t.name, city: t.city, text: t.text, income: t.income, rank: t.rank, isActive: t.isActive, order: t.order }); setEditId(t._id); setPhotoFile(null); setShowForm(true); };

  const handleSave = async () => {
    if (!form.name || !form.text) return toast.error('Naam aur testimonial text zaroori hai');
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (photoFile) fd.append('photo', photoFile);

      if (editId) {
        const r = await axios.put(`/api/testimonials/${editId}`, form, { headers: headers() });
        setTestimonials(t => t.map(x => x._id === editId ? r.data : x));
        toast.success('Update ho gaya!');
      } else {
        const r = await axios.post('/api/testimonials', fd, { headers: { ...headers(), 'Content-Type': 'multipart/form-data' } });
        setTestimonials(t => [r.data, ...t]);
        toast.success('Testimonial add ho gaya!');
      }
      setShowForm(false);
    } catch { toast.error('Save nahi hua'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete karein?')) return;
    try {
      await axios.delete(`/api/testimonials/${id}`, { headers: headers() });
      setTestimonials(t => t.filter(x => x._id !== id));
      toast.success('Deleted!');
    } catch { toast.error('Delete nahi hua'); }
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginBottom: '0.3rem' }}>Testimonials</h1>
          <p style={{ color: '#A09880', fontSize: '0.85rem' }}>Team members ki success stories manage karein</p>
        </div>
        <button className="btn-primary" onClick={openAdd} style={{ gap: 8 }}><FaPlus /> Naya Add Karein</button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div style={{ background: '#12121A', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem' }}>{editId ? 'Edit Testimonial' : 'Naya Testimonial'}</h3>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: '#A09880', cursor: 'pointer', fontSize: '1rem' }}><FaTimes /></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div><label>Naam *</label><input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Team member ka naam" /></div>
            <div><label>City</label><input value={form.city} onChange={e => set('city', e.target.value)} placeholder="Shehar ka naam" /></div>
            <div><label>Rank</label><input value={form.rank} onChange={e => set('rank', e.target.value)} placeholder="e.g. Silver Leader" /></div>
            <div><label>Monthly Income</label><input value={form.income} onChange={e => set('income', e.target.value)} placeholder="e.g. ₹50,000/month" /></div>
            <div><label>Order (display sequence)</label><input type="number" value={form.order} onChange={e => set('order', e.target.value)} /></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: '1.5rem' }}>
              <input type="checkbox" id="isActive" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} style={{ width: 'auto' }} />
              <label htmlFor="isActive" style={{ margin: 0 }}>Active (portfolio mein dikhega)</label>
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label>Testimonial Text *</label>
            <textarea value={form.text} onChange={e => set('text', e.target.value)} rows={4} placeholder="Success story likhein..." style={{ resize: 'vertical' }} />
          </div>
          {!editId && (
            <div style={{ marginTop: '1rem' }}>
              <label>Photo (optional)</label>
              <input type="file" accept="image/*" onChange={e => setPhotoFile(e.target.files[0])} />
            </div>
          )}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.2rem', justifyContent: 'flex-end' }}>
            <button onClick={() => setShowForm(false)} className="btn-outline">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ gap: 8 }}>
              <FaCheck /> {saving ? 'Saving...' : 'Save Karein'}
            </button>
          </div>
        </div>
      )}

      {/* Testimonials Grid */}
      {loading ? (
        <p style={{ color: '#A09880', textAlign: 'center', padding: '2rem' }}>Loading...</p>
      ) : testimonials.length === 0 ? (
        <div style={{ background: '#12121A', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 16, padding: '3rem', textAlign: 'center', color: '#5A5848' }}>
          Abhi koi testimonial nahi hai. Pehla testimonial add karein!
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {testimonials.map(t => (
            <div key={t._id} style={{ background: '#12121A', border: `1px solid ${t.isActive ? 'rgba(201,168,76,0.2)' : 'rgba(90,88,72,0.3)'}`, borderRadius: 14, padding: '1.2rem', opacity: t.isActive ? 1 : 0.6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #C9A84C, #604820)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0A0A0F', flexShrink: 0, overflow: 'hidden' }}>
                    {t.photo ? <img src={t.photo} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#C9A84C' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#A09880' }}>{t.rank || 'Member'}{t.city ? ` · ${t.city}` : ''}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => openEdit(t)} style={{ background: 'rgba(201,168,76,0.1)', border: 'none', color: '#C9A84C', padding: '6px 10px', borderRadius: 8, cursor: 'pointer' }}><FaEdit /></button>
                  <button onClick={() => handleDelete(t._id)} style={{ background: 'rgba(232,80,80,0.1)', border: 'none', color: '#E85050', padding: '6px 10px', borderRadius: 8, cursor: 'pointer' }}><FaTrash /></button>
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#C0B8AC', lineHeight: 1.7, marginBottom: '0.6rem' }}>{t.text}</p>
              {t.income && <span style={{ background: 'rgba(76,175,124,0.1)', border: '1px solid rgba(76,175,124,0.3)', color: '#4CAF7C', padding: '3px 10px', borderRadius: 50, fontSize: '0.75rem' }}>💰 {t.income}</span>}
              {!t.isActive && <span style={{ marginLeft: 6, background: 'rgba(90,88,72,0.2)', color: '#5A5848', padding: '3px 10px', borderRadius: 50, fontSize: '0.75rem' }}>Hidden</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
