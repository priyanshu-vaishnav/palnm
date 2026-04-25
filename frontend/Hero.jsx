import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaWhatsapp, FaInstagram, FaFacebook, FaYoutube, FaArrowDown } from 'react-icons/fa';

export default function Hero({ profile }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  const photo = profile?.photo || '/profile.jpeg';

  const socials = [
    { icon: <FaWhatsapp />, href: `https://wa.me/${profile?.whatsapp}`, show: !!profile?.whatsapp },
    { icon: <FaInstagram />, href: profile?.socialLinks?.instagram, show: !!profile?.socialLinks?.instagram },
    { icon: <FaFacebook />, href: profile?.socialLinks?.facebook, show: !!profile?.socialLinks?.facebook },
    { icon: <FaYoutube />, href: profile?.socialLinks?.youtube, show: !!profile?.socialLinks?.youtube },
  ].filter(s => s.show);

  return (
    <section id="hero" style={{
      minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center',
      justifyContent: 'center', overflow: 'hidden', padding: '7rem 1.5rem 4rem',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 65% 40%, rgba(201,168,76,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 70%, rgba(100,60,200,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />

      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span style={{
            display: 'inline-block', border: '1px solid #C9A84C', color: '#C9A84C',
            fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase',
            padding: '6px 22px', borderRadius: 30, marginBottom: '1.5rem',
          }}>⭐ {profile?.rank || 'Supervisor'} — RiseNova Skill Services ⭐</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} style={{ marginBottom: '1.5rem' }}>
          <div style={{
            width: 170, height: 170, borderRadius: '50%', margin: '0 auto',
            border: '2px solid #C9A84C', padding: 4,
            boxShadow: '0 0 50px rgba(201,168,76,0.35)',
            animation: 'pulse-gold 3s infinite',
          }}>
            <img src={photo} alt={profile?.name || 'Profile'} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="gold-text" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '0.5rem' }}>
          {profile?.name || 'Manju Pal'}
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          style={{ color: '#A09880', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
          {profile?.title || 'AI Automation Specialist'} &nbsp;|&nbsp; {profile?.location || 'Greater Noida, UP'}
        </motion.p>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
          style={{ color: '#D0C8BC', fontSize: '1.05rem', maxWidth: 560, margin: '0 auto 2rem', lineHeight: 1.7 }}>
          {profile?.tagline || 'Skills Seekho, Zindagi Badlo — Apni Bhi, Doosron Ki Bhi'}
        </motion.p>

        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{ display: 'flex', gap: 0, justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {[
            { num: '30', suffix: '+', label: 'Team Members' },
            { num: '2', suffix: ' Saal', label: 'Experience' },
            { num: '10', suffix: ' Lakh+', label: 'Total Income' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '0 2rem', borderRight: i < 2 ? '1px solid rgba(201,168,76,0.3)' : 'none' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 700, color: '#E8C84A', lineHeight: 1 }}>
                {inView ? <CountUp end={parseInt(s.num)} duration={2} separator="," /> : '0'}{s.suffix}
              </div>
              <div style={{ fontSize: '11px', color: '#A09880', letterSpacing: '1px', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <button className="btn-primary" onClick={scrollToContact}>
            Abhi Judein <FaArrowDown />
          </button>
          {profile?.whatsapp && (
            <a href={`https://wa.me/${profile.whatsapp}?text=Namaste! Main RiseNova ke baare mein jaanna chahta/chahti hoon.`} target="_blank" rel="noreferrer">
              <button className="btn-outline" style={{ color: '#4CAF7C', borderColor: '#4CAF7C' }}>
                <FaWhatsapp /> WhatsApp Karein
              </button>
            </a>
          )}
        </motion.div>

        {socials.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer" style={{
                width: 40, height: 40, borderRadius: '50%', background: 'rgba(201,168,76,0.1)',
                border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#C9A84C', fontSize: '1rem', transition: 'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.25)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                {s.icon}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
