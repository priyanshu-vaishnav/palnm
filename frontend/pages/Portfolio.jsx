import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Hero from '../Hero';
import Achievements from './Achievements';
import Story from '../Story';
import Testimonials from '../Testimonials';
import Opportunity from '../Opportunity';
import Contact from '../Contact';
import Footer from '../Footer';

// Production-safe API base URL
const API = import.meta.env.VITE_API_URL || '';

export default function Portfolio() {
  const [profile, setProfile] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Profile
    axios.get(`${API}/api/profile`)
      .then(r => { if (r.data && typeof r.data === 'object') setProfile(r.data); })
      .catch(() => {});

    // Achievements — ensure array
    axios.get(`${API}/api/achievements`)
      .then(r => {
        const data = r.data;
        setAchievements(Array.isArray(data) ? data : []);
      })
      .catch(() => setAchievements([]));

    // Testimonials — ensure array
    axios.get(`${API}/api/testimonials`)
      .then(r => {
        const data = r.data;
        setTestimonials(Array.isArray(data) ? data : []);
      })
      .catch(() => setTestimonials([]));
  }, []);

  return (
    <>
      <Navbar profile={profile} />
      <Hero profile={profile} />
      <Achievements achievements={achievements} />
      <Story profile={profile} />
      <Testimonials testimonials={testimonials} />
      <Opportunity profile={profile} />
      <Contact profile={profile} />
      <Footer profile={profile} />
    </>
  );
}