export default function Footer({ profile }) {
  return (
    <footer style={{ background: '#08080F', borderTop: '1px solid rgba(201,168,76,0.12)', padding: '2.5rem 1.5rem', textAlign: 'center' }}>
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#C9A84C', marginBottom: '0.4rem' }}>
        {profile?.name || 'Portfolio'}
      </div>
      <div style={{ fontSize: '0.8rem', color: '#A09880', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' }}>
        {profile?.rank || 'Network Marketing Leader'}
      </div>
      <p style={{ fontSize: '0.78rem', color: '#5A5848' }}>
        © {new Date().getFullYear()} {profile?.name}. All rights reserved. &nbsp;|&nbsp;
        <a href="/admin/login" style={{ color: '#5A5848', textDecoration: 'none' }}>Admin</a>
      </p>
    </footer>
  );
}
