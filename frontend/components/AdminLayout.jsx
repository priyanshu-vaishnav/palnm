import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaUsers, FaStar, FaTrophy, FaHome, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

const navItems = [
  { to: '/admin', icon: <FaTachometerAlt />, label: 'Dashboard', end: true },
  { to: '/admin/profile', icon: <FaUser />, label: 'Profile Edit' },
  { to: '/admin/leads', icon: <FaUsers />, label: 'Leads / Contacts' },
  { to: '/admin/testimonials', icon: <FaStar />, label: 'Testimonials' },
  { to: '/admin/achievements', icon: <FaTrophy />, label: 'Achievements' },
];

const linkStyle = (isActive) => ({
  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
  borderRadius: 10, textDecoration: 'none', fontSize: '0.88rem',
  background: isActive ? 'rgba(201,168,76,0.15)' : 'transparent',
  color: isActive ? '#C9A84C' : '#A09880', fontWeight: isActive ? 600 : 400,
  borderLeft: isActive ? '2px solid #C9A84C' : '2px solid transparent',
  transition: 'all 0.2s',
});

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0F' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: '#12121A', borderRight: '1px solid rgba(201,168,76,0.12)', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', color: '#C9A84C', marginBottom: '0.2rem', padding: '0 8px' }}>Admin Panel</div>
        <div style={{ fontSize: '0.75rem', color: '#5A5848', marginBottom: '2rem', padding: '0 8px' }}>Portfolio Manager</div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end} style={({ isActive }) => linkStyle(isActive)}>
              <span style={{ fontSize: '0.85rem' }}>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ borderTop: '1px solid rgba(201,168,76,0.12)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="/" target="_blank" rel="noreferrer" style={{ ...linkStyle(false), color: '#A09880' }}>
            <FaHome style={{ fontSize: '0.85rem' }} /> Portfolio Dekhen
          </a>
          <button onClick={handleLogout} style={{ ...linkStyle(false), background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', color: '#E85050' }}>
            <FaSignOutAlt style={{ fontSize: '0.85rem' }} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
