import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaStar } from 'react-icons/fa';

const defaultTestimonials = [
  { name: 'Priya Verma', city: 'Bilaspur', text: 'Unki guidance se maine 6 mahine mein naukri se zyada kamaana shuru kar diya. Aaj main financially free hoon.', income: '₹60,000/month', rank: 'Silver Leader' },
  { name: 'Rahul Soni', city: 'Durg', text: 'Ghar baithe business karna impossible lagta tha. Unke proven system ne mujhe sab kuch sikha diya. Ab meri team 200+ hai.', income: '₹40,000/month', rank: 'Bronze Leader' },
  { name: 'Anita Yadav', city: 'Raipur', text: 'Part-time start kiya tha, ab yahi meri full time income hai. Support 24/7 milta hai. Life completely change ho gayi.', income: '₹80,000/month', rank: 'Gold Leader' },
  { name: 'Suresh Kumar', city: 'Bhilai', text: 'Pehle bahut skeptical tha lekin results dekh ke yaqeen aa gaya. Ab main bhi apni team ko guide kar raha hoon.', income: '₹35,000/month', rank: 'Active Member' },
  { name: 'Meena Patel', city: 'Jagdalpur', text: 'Ek housewife thi. Aaj apni team lead karti hoon aur ghar ke saath saath earning bhi kar rahi hoon. Shukriya!', income: '₹50,000/month', rank: 'Silver Leader' },
  { name: 'Vikram Singh', city: 'Korba', text: 'Jo main soch bhi nahi sakta tha wo achieve kar liya. Income trip aur recognition — sab milaa ek hi platform se.', income: '₹90,000/month', rank: 'Gold Leader' },
];

export default function Testimonials({ testimonials }) {
  const data = testimonials?.length > 0 ? testimonials : defaultTestimonials;
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="testimonials" style={{ background: '#12121A', padding: '6rem 1.5rem' }}>
      <div className="container">
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="section-label">Log Kya Kehte Hain</p>
          <h2 className="section-title">Team ke <span className="gold-text">Success Stories</span></h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {data.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                background: '#1A1A28', border: '1px solid rgba(201,168,76,0.1)',
                borderRadius: 16, padding: '1.8rem', position: 'relative',
                transition: 'border-color 0.3s',
              }}
              whileHover={{ borderColor: 'rgba(201,168,76,0.35)' }}
            >
              {/* Quote mark */}
              <div style={{ position: 'absolute', top: '1rem', right: '1.5rem', fontFamily: 'Playfair Display, serif', fontSize: '4rem', color: 'rgba(201,168,76,0.12)', lineHeight: 1 }}>"</div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: 3, marginBottom: '1rem' }}>
                {[...Array(5)].map((_, j) => <FaStar key={j} style={{ color: '#C9A84C', fontSize: '0.75rem' }} />)}
              </div>

              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: '#C0B8AC', marginBottom: '1.5rem' }}>{t.text}</p>

              {/* Income badge */}
              {t.income && (
                <div style={{ background: 'rgba(76,175,124,0.1)', border: '1px solid rgba(76,175,124,0.3)', color: '#4CAF7C', padding: '4px 12px', borderRadius: 50, fontSize: '0.78rem', display: 'inline-block', marginBottom: '1rem' }}>
                  💰 {t.income}
                </div>
              )}

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C9A84C, #604820)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 600, fontSize: 15, color: '#0A0A0F', flexShrink: 0,
                }}>
                  {t.photo ? <img src={t.photo} alt={t.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : t.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#C9A84C' }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#A09880' }}>{t.rank} · {t.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
