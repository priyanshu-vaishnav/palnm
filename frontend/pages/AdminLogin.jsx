import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return toast.error('Email aur password daalein');
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome Admin! 🎉');
      navigate('/admin');
    } catch {
      toast.error('Email ya password galat hai');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A0F', padding: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 420, background: '#12121A', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 20, padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#C9A84C', marginBottom: '0.3rem' }}>Admin Panel</div>
          <p style={{ color: '#A09880', fontSize: '0.85rem' }}>Portfolio manage karne ke liye login karein</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@example.com" onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          </div>
          <button className="btn-primary" onClick={handleLogin} disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Logging in...' : 'Login Karein'}
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: '#5A5848' }}>
          <a href="/" style={{ color: '#C9A84C', textDecoration: 'none' }}>← Portfolio dekhen</a>
        </p>
      </div>
    </div>
  );
}
