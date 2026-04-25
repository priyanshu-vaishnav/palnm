import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const STATUS_OPTIONS = ['new', 'contacted', 'interested', 'joined', 'not_interested'];
const STATUS_COLOR = { new: '#E8C84A', contacted: '#C9A84C', interested: '#4CAF7C', joined: '#7C6CF0', not_interested: '#E85050' };

export default function AdminLeads() {
  const { getToken } = useAuth();
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const h = { Authorization: `Bearer ${getToken()}` };
      const params = new URLSearchParams({ page, limit: 15 });
      if (filter) params.append('status', filter);
      const r = await axios.get(`/api/leads?${params}`, { headers: h });
      setLeads(r.data.leads); setTotal(r.data.total); setPages(r.data.pages);
    } catch { toast.error('Leads load nahi hue'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchLeads(); }, [filter, page]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/leads/${id}`, { status }, { headers: { Authorization: `Bearer ${getToken()}` } });
      setLeads(l => l.map(x => x._id === id ? { ...x, status } : x));
      toast.success('Status update hua!');
    } catch { toast.error('Update nahi hua'); }
  };

  const deleteLead = async (id) => {
    if (!confirm('Is lead ko delete karein?')) return;
    try {
      await axios.delete(`/api/leads/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } });
      setLeads(l => l.filter(x => x._id !== id)); setTotal(t => t - 1);
      toast.success('Deleted!');
    } catch { toast.error('Delete nahi hua'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginBottom: '0.3rem' }}>Leads & Contacts</h1>
          <p style={{ color: '#A09880', fontSize: '0.85rem' }}>Total {total} leads</p>
        </div>
        <select value={filter} onChange={e => { setFilter(e.target.value); setPage(1); }} style={{ width: 'auto' }}>
          <option value="">Sab Leads</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div style={{ background: '#12121A', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ background: 'rgba(201,168,76,0.05)' }}>
                {['Naam', 'Phone', 'Email', 'City', 'Status', 'Date', 'Action'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '0.72rem', color: '#A09880', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#A09880' }}>Loading...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#5A5848' }}>Koi lead nahi mila</td></tr>
              ) : leads.map(lead => (
                <tr key={lead._id} style={{ borderTop: '1px solid rgba(201,168,76,0.06)', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 14px', fontSize: '0.88rem', fontWeight: 500 }}>{lead.name}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <a href={`tel:${lead.phone}`} style={{ color: '#C9A84C', textDecoration: 'none', fontSize: '0.85rem' }}>{lead.phone}</a>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '0.82rem', color: '#A09880' }}>{lead.email || '—'}</td>
                  <td style={{ padding: '12px 14px', fontSize: '0.82rem', color: '#A09880' }}>{lead.city || '—'}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <select value={lead.status} onChange={e => updateStatus(lead._id, e.target.value)}
                      style={{ width: 'auto', padding: '4px 8px', fontSize: '0.78rem', background: `${STATUS_COLOR[lead.status]}22`, color: STATUS_COLOR[lead.status], border: `1px solid ${STATUS_COLOR[lead.status]}44`, borderRadius: 8 }}>
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: '12px 14px', fontSize: '0.75rem', color: '#5A5848' }}>
                    {new Date(lead.createdAt).toLocaleDateString('hi-IN')}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <button onClick={() => deleteLead(lead._id)} style={{ background: 'none', border: 'none', color: '#E85050', cursor: 'pointer', fontSize: '0.8rem', padding: '4px 8px', borderRadius: 6, transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,80,80,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(201,168,76,0.08)', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            {[...Array(pages)].map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} style={{
                width: 32, height: 32, borderRadius: 8, border: '1px solid',
                borderColor: page === i + 1 ? '#C9A84C' : 'rgba(201,168,76,0.2)',
                background: page === i + 1 ? 'rgba(201,168,76,0.2)' : 'transparent',
                color: page === i + 1 ? '#C9A84C' : '#A09880', cursor: 'pointer', fontSize: '0.82rem',
              }}>{i + 1}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
