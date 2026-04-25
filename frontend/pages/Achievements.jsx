import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import HeroCarousel from "./HeroCarousal";
const defaultAchievements = [
  { icon: '🎯', value: 'Supervisor', title: 'Current Rank', description: 'RiseNova Skill Services mein Supervisor level achieve kiya' },
  { icon: '👥', value: '30+', title: 'Team Members', description: '10 direct + 20+ downline — poori team active hai' },
  { icon: '💰', value: '₹10L+', title: 'Total Income', description: '2 saalon mein skill-based work se total earnings' },
  { icon: '📅', value: '2 Saal', title: 'Experience', description: 'AI Automation aur skill services mein proven track record' },
  { icon: '🤖', value: 'AI Expert', title: 'Automation Skills', description: 'ChatGPT, AI tools aur workflow automation mein expertise' },
  { icon: '📈', value: '₹50K/mo', title: 'Monthly Income', description: 'Consistent ₹40,000–50,000 monthly ghar baithe' },
];

export default function Achievements({ achievements }) {
  const data = achievements?.length > 0 ? achievements : defaultAchievements;
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  
return (
    <>
      <HeroCarousel />

      <section id="achievements" style={{ background: '#12121A', padding: '6rem 1.5rem' }}>
        <div className="container">
         <section id="achievements" style={{ background: '#12121A', padding: '6rem 1.5rem' }}>
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="section-label">Numbers Jo Bolte Hain</p>
          <h2 className="section-title">Achievements & <span className="gold-text">Milestones</span></h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {data.map((a, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                background: 'linear-gradient(135deg, #1A1A28, #0F0F1E)',
                border: '1px solid rgba(201,168,76,0.18)', borderRadius: 16,
                padding: '1.8rem', position: 'relative', overflow: 'hidden',
                transition: 'all 0.3s', cursor: 'default',
              }}
              whileHover={{ y: -6, borderColor: 'rgba(201,168,76,0.5)' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
              <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{a.icon}</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 900, color: '#E8C84A', lineHeight: 1 }}>{a.value}</div>
              <div style={{ fontWeight: 600, marginTop: '0.3rem', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{a.title}</div>
              <div style={{ fontSize: '0.82rem', color: '#A09880', lineHeight: 1.6 }}>{a.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
        </div>
      </section>
    </>
  );
}
  

