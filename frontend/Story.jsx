import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaQuoteLeft } from 'react-icons/fa';

export default function Story({ profile }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const photo = profile?.photo || '/profile.jpeg';

  const story = profile?.story ||
    `Pehle sirf ek normal zindagi thi — koi bada sapna nahi, koi extra income ka rasta nahi. Aaj main RiseNova Skill Services ke saath 2 saal se kaam kar rahi hoon aur zindagi sach mein badli hai.

Main ek AI Automation Specialist hoon — yahan koi product nahi bechna, koi network marketing nahi — sirf genuine skills seekhna aur sikhana. Meri direct team 10 logon ki hai aur poori team 30+ ki.

2 saalon mein ₹10 Lakh+ ki total income, aur ab ₹40,000–50,000 har mahine — ghar baithe, apne waqt pe. Agar aap bhi sochte hain ki kuch alag karna hai — toh ek baar zaroor baat karein.`;

  return (
    <section id="story" style={{ padding: '6rem 1.5rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <motion.div ref={ref} initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <div style={{ position: 'relative', marginBottom: '2rem' }}>
              <img src={photo} alt={profile?.name || 'Profile'} style={{ width: '100%', borderRadius: 20, objectFit: 'cover', objectPosition: 'top', maxHeight: 420, border: '1px solid rgba(201,168,76,0.2)' }} />
              <div style={{ position: 'absolute', inset: 0, borderRadius: 20, background: 'linear-gradient(to top, rgba(10,10,15,0.6) 0%, transparent 50%)' }} />
            </div>
            <div style={{ background: '#12121A', border: '1px solid rgba(201,168,76,0.2)', borderLeft: '3px solid #C9A84C', borderRadius: 12, padding: '1.5rem' }}>
              <FaQuoteLeft style={{ color: 'rgba(201,168,76,0.4)', fontSize: '1.5rem', marginBottom: '0.8rem' }} />
              <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontStyle: 'italic', color: '#F0D080', lineHeight: 1.7 }}>
                {profile?.personalQuote || '"Skills hi asli asset hain — jo koi cheen nahi sakta."'}
              </p>
              <p style={{ color: '#A09880', fontSize: '0.8rem', marginTop: '0.8rem' }}>— {profile?.name || 'Aapka Naam'}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}>
            <p className="section-label">Personal Journey</p>
            <h2 className="section-title">Meri Kahani — <span className="gold-text">Aapki Prerana</span></h2>
            <div className="gold-line" />
            <div style={{ color: '#C0B8AC', lineHeight: 1.9, fontSize: '1rem' }}>
              {story.split('\n\n').map((para, i) => <p key={i} style={{ marginBottom: '1.2rem' }}>{para}</p>)}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1.5rem' }}>
              {['Supervisor Rank', 'AI Automation', '₹10L+ Earned', '30+ Team', 'RiseNova Leader'].map(tag => (
                <span key={tag} style={{
                  background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)',
                  color: '#C9A84C', padding: '5px 14px', borderRadius: 50, fontSize: '0.78rem', letterSpacing: '0.5px',
                }}>{tag}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
