import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'My Story', href: '#story' },
  { label: 'Success Stories', href: '#testimonials' },
  { label: 'Opportunity', href: '#opportunity' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000,
      background: scrolled ? 'rgba(10,10,15,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
      transition: 'all 0.3s', padding: '0 1.5rem',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        {/* Logo */}
        <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700 }}>
          <span style={{ color: '#C9A84C' }}>{profile?.name?.split(' ')[0] || 'Portfolio'}</span>
          <span style={{ color: '#A09880', fontSize: '0.8rem', marginLeft: 8, fontFamily: 'DM Sans, sans-serif', fontWeight: 400 }}>| {profile?.rank || 'Leader'}</span>
        </div>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)} style={{
              background: 'none', border: 'none', color: '#A09880', cursor: 'pointer',
              fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', transition: 'color 0.2s',
              letterSpacing: '0.5px',
            }}
            onMouseEnter={e => e.target.style.color = '#C9A84C'}
            onMouseLeave={e => e.target.style.color = '#A09880'}
            >{l.label}</button>
          ))}
          <button className="btn-primary" style={{ padding: '8px 22px', fontSize: '0.85rem' }} onClick={() => scrollTo('#contact')}>
            Join Now
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', color: '#C9A84C', fontSize: '1.4rem', cursor: 'pointer' }} className="hamburger">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{
          background: 'rgba(10,10,15,0.98)', backdropFilter: 'blur(20px)',
          padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem',
          borderBottom: '1px solid rgba(201,168,76,0.2)',
        }}>
          {navLinks.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)} style={{
              background: 'none', border: 'none', color: '#F5F0E8', cursor: 'pointer',
              fontSize: '1rem', fontFamily: 'DM Sans, sans-serif', textAlign: 'left', padding: '6px 0',
            }}>{l.label}</button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
