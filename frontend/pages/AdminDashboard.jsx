import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaUsers, FaUserCheck, FaUserPlus, FaHandshake } from 'react-icons/fa';

export default function AdminDashboard() {
  const { getToken } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);

  useEffect(() => {
    const h = { Authorization: `Bearer ${getToken()}` };
    axios.get('/api/leads/stats', { headers: h }).then(r => setStats(r.data)).catch(() => {});
    axios.get('/api/leads?limit=5', { headers: h }).then(r => setRecentLeads(r.data.leads || [])).catch(() => {});
  }, []);

  const statCards = [
    { label: 'Total Leads', value: stats?.total ?? '—', icon: <FaUsers />, color: '#C9A84C' },
    { label: 'New Leads', value: stats?.newLeads ?? '—', icon: <FaUserPlus />, color: '#E8C84A' },
    { label: 'Interested', value: stats?.interested ?? '—', icon: <FaUserCheck />, color: '#4CAF7C' },
    { label: 'Joined Team', value: stats?.joined ?? '—', icon: <FaHandshake />, color: '#7C6CF0' },
  ];

  const statusColor = { new: '#E8C84A', contacted: '#C9A84C', interested: '#4CAF7C', joined: '#7C6CF0', not_interested: '#E85050' };

  return (
    <div>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginBottom: '0.3rem' }}>Dashboard</h1>
      <p style={{ color: '#A09880', fontSize: '0.85rem', marginBottom: '2rem' }}>Aapke portfolio ki performance</p>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        {statCards.map((s, i) => (
          <div key={i} style={{ background: '#12121A', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 14, padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#A09880', marginBottom: '0.4rem' }}>{s.label}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 700, color: s.color }}>{s.value}</div>
              </div>
              <div style={{ color: s.color, fontSize: '1.5rem', opacity: 0.6 }}>{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Leads Table */}
      <div style={{ background: '#12121A', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(201,168,76,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem' }}>Recent Leads</h3>
          <a href="/admin/leads" style={{ color: '#C9A84C', fontSize: '0.8rem', textDecoration: 'none' }}>Sab Dekhen →</a>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(201,168,76,0.05)' }}>
                {['Naam', 'Phone', 'City', 'Status', 'Date'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '0.75rem', color: '#A09880', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(201,168,76,0.06)' }}>
                  <td style={{ padding: '12px 16px', fontSize: '0.88rem' }}>{lead.name}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.88rem', color: '#A09880' }}>{lead.phone}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.88rem', color: '#A09880' }}>{lead.city || '—'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: `${statusColor[lead.status]}22`, color: statusColor[lead.status], padding: '3px 10px', borderRadius: 50, fontSize: '0.75rem', border: `1px solid ${statusColor[lead.status]}44` }}>
                      {lead.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '0.78rem', color: '#A09880' }}>{new Date(lead.createdAt).toLocaleDateString('hi-IN')}</td>
                </tr>
              ))}
              {recentLeads.length === 0 && (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#5A5848' }}>Abhi koi lead nahi hai</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
