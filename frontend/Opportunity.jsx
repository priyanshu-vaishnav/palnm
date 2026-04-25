import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBrain, FaRocket, FaHome, FaClock, FaUsers, FaLaptop, FaMoneyBillWave } from 'react-icons/fa';

const benefits = [
  { icon: <FaBrain />, title: 'AI Automation Skills', desc: 'Real skills seekho — ChatGPT, automation tools, aur AI workflows jo aaj ki duniya mein kaam aate hain' },
  { icon: <FaHome />, title: 'Ghar Se Kaam', desc: 'Laptop aur internet bas — office jaane ki zaroorat nahi' },
  { icon: <FaClock />, title: 'Part-Time Ya Full-Time', desc: 'Apne schedule ke hisaab se kaam — flexibility 100%' },
  { icon: <FaMoneyBillWave />, title: 'Skill-Based Income', desc: 'Koi product nahi, koi affiliate nahi — sirf skills se kamaai' },
  { icon: <FaUsers />, title: 'Team Support', desc: 'Supervisor aur poori team ka direct support milta hai' },
  { icon: <FaRocket />, title: 'Fast Growth', desc: 'Dedicated log 2-3 mahine mein clearly results dekhte hain' },
];

const steps = [
  { num: '01', title: 'Baat Karein', desc: 'Free call ya WhatsApp — koi pressure nahi' },
  { num: '02', title: 'Samjhein', desc: 'Poora system clearly samjhein — skills, income, kaise kaam karta hai' },
  { num: '03', title: 'Join Karein', desc: 'Simple onboarding — aur skills training shuru' },
  { num: '04', title: 'Grow Karein', desc: 'Apni team banao, skills share karo, income badhao' },
];

export default function Opportunity({ profile }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="opportunity" style={{ padding: '6rem 1.5rem', background: 'linear-gradient(180deg, #0A0A0F 0%, #0E0C1A 50%, #0A0A0F 100%)' }}>
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="section-label">RiseNova Skill Services</p>
          <h2 className="section-title">Koi Product Nahi, Koi MLM Nahi —<br /><span className="gold-text">Sirf Skills, Sirf Income</span></h2>
          <p style={{ color: '#A09880', maxWidth: 580, margin: '0 auto', lineHeight: 1.8 }}>
            RiseNova ek skill-based platform hai jahan aap AI Automation seekhte hain aur doosron ko sikhate hain. 
            No product selling, no network marketing — sirf genuine skills aur real income.
          </p>
        </motion.div>

        {/* What makes it different */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 16, padding: '1.5rem 2rem', marginBottom: '3rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {['✅ No Product Selling', '✅ No Network Marketing', '✅ No Affiliate Marketing', '✅ AI Automation Skills Based'].map(t => (
              <span key={t} style={{ color: '#C9A84C', fontWeight: 600, fontSize: '0.9rem' }}>{t}</span>
            ))}
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '5rem' }}>
          {benefits.map((b, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
              style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 14, padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ color: '#C9A84C', fontSize: '1.3rem', marginTop: 2, flexShrink: 0 }}>{b.icon}</div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>{b.title}</div>
                <div style={{ fontSize: '0.82rem', color: '#A09880', lineHeight: 1.6 }}>{b.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="section-label">Kaise Shuroo Karein</p>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginBottom: '2rem' }}>4 Aasaan Steps</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {steps.map((s, i) => (
              <div key={i} style={{ background: '#12121A', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 14, padding: '1.8rem', textAlign: 'center', position: 'relative' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', fontWeight: 900, color: 'rgba(201,168,76,0.15)', lineHeight: 1, marginBottom: '0.5rem' }}>{s.num}</div>
                <div style={{ fontWeight: 600, marginBottom: '0.4rem' }}>{s.title}</div>
                <div style={{ fontSize: '0.82rem', color: '#A09880' }}>{s.desc}</div>
                {i < steps.length - 1 && (
                  <div style={{ position: 'absolute', right: -12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(201,168,76,0.4)', fontSize: '1.2rem', zIndex: 1 }}>›</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
