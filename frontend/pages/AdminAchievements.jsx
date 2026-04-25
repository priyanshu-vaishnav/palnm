import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { FaPlus, FaTrash, FaEdit, FaTimes, FaCheck } from 'react-icons/fa';

const emptyForm = { icon: '🏆', title: '', value: '', description: '', isActive: true, order: 0 };

export default function AdminAchievements() {
  const { getToken } = useAuth();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const headers = () => ({ Authorization: `Bearer ${getToken()}` });

  const fetchAll = async () => {
    setLoading(true);
    try {
      // Fetch all (including inactive) for admin
      const r = await axios.get('/api/achievements', { headers: headers() });
      setAchievements(r.data);
    } catch { toast.error('Load nahi hua'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (a) => { setForm({ icon: a.icon, title: a.title, value: a.value, description: a.description, isActive: a.isActive, order: a.order }); setEditId(a._id); setShowForm(true); };

  const handleSave = async () => {
    if (!form.title || !form.value) return toast.error('Title aur value zaroori hai');
    setSaving(true);
    try {
      if (editId) {
        const r = await axios.put(`/api/achievements/${editId}`, form, { headers: headers() });
        setAchievements(a => a.map(x => x._id === editId ? r.data : x));
        toast.success('Update ho gaya!');
      } else {
        const r = await axios.post('/api/achievements', form, { headers: headers() });
        setAchievements(a => [...a, r.data]);
        toast.success('Achievement add ho gaya!');
      }
      setShowForm(false);
    } catch { toast.error('Save nahi hua'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete karein?')) return;
    try {
      await axios.delete(`/api/achievements/${id}`, { headers: headers() });
      setAchievements(a => a.filter(x => x._id !== id));
      toast.success('Deleted!');
    } catch { toast.error('Delete nahi hua'); }
  };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginBottom: '0.3rem' }}>Achievements</h1>
          <p style={{ color: '#A09880', fontSize: '0.85rem' }}>Apni achievements portfolio mein manage karein</p>
        </div>
        <button className="btn-primary" onClick={openAdd} style={{ gap: 8 }}><FaPlus /> Naya Add Karein</button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div style={{ background: '#12121A', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem' }}>{editId ? 'Edit Achievement' : 'Naya Achievement'}</h3>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', color: '#A09880', cursor: 'pointer', fontSize: '1rem' }}><FaTimes /></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div><label>Icon (emoji)</label><input value={form.icon} onChange={e => set('icon', e.target.value)} placeholder="🏆" /></div>
            <div><label>Title *</label><input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Team Members" /></div>
            <div><label>Value *</label><input value={form.value} onChange={e => set('value', e.target.value)} placeholder="e.g. 5000+, Diamond, ₹2L+" /></div>
            <div><label>Order (display sequence)</label><input type="number" value={form.order} onChange={e => set('order', e.target.value)} /></div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label>Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={2} placeholder="Short description..." style={{ resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: '0.8rem' }}>
            <input type="checkbox" id="achActive" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} style={{ width: 'auto' }} />
            <label htmlFor="achActive" style={{ margin: 0 }}>Active (portfolio mein dikhega)</label>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.2rem', justifyContent: 'flex-end' }}>
            <button onClick={() => setShowForm(false)} className="btn-outline">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ gap: 8 }}>
              <FaCheck /> {saving ? 'Saving...' : 'Save Karein'}
            </button>
          </div>
        </div>
      )}

      {/* Achievements Grid */}
      {loading ? (
        <p style={{ color: '#A09880', textAlign: 'center', padding: '2rem' }}>Loading...</p>
      ) : achievements.length === 0 ? (
        <div style={{ background: '#12121A', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 16, padding: '3rem', textAlign: 'center', color: '#5A5848' }}>
          Abhi koi achievement nahi hai. Pehli achievement add karein!
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {achievements.map(a => (
            <div key={a._id} style={{ background: 'linear-gradient(135deg, #1A1A28, #0F0F1E)', border: `1px solid ${a.isActive ? 'rgba(201,168,76,0.2)' : 'rgba(90,88,72,0.3)'}`, borderRadius: 14, padding: '1.4rem', opacity: a.isActive ? 1 : 0.6, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: 'linear-gradient(90deg, #C9A84C, transparent)', borderRadius: '14px 14px 0 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{a.icon}</div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 900, color: '#E8C84A', lineHeight: 1 }}>{a.value}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: '0.3rem' }}>{a.title}</div>
                  {a.description && <div style={{ fontSize: '0.78rem', color: '#A09880', marginTop: '0.4rem', lineHeight: 1.5 }}>{a.description}</div>}
                  {!a.isActive && <span style={{ display: 'inline-block', marginTop: 6, background: 'rgba(90,88,72,0.2)', color: '#5A5848', padding: '2px 8px', borderRadius: 50, fontSize: '0.72rem' }}>Hidden</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                  <button onClick={() => openEdit(a)} style={{ background: 'rgba(201,168,76,0.1)', border: 'none', color: '#C9A84C', padding: '6px 10px', borderRadius: 8, cursor: 'pointer' }}><FaEdit /></button>
                  <button onClick={() => handleDelete(a._id)} style={{ background: 'rgba(232,80,80,0.1)', border: 'none', color: '#E85050', padding: '6px 10px', borderRadius: 8, cursor: 'pointer' }}><FaTrash /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
