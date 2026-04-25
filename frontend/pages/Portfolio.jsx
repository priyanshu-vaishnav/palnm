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

export default function Portfolio() {
  const [profile, setProfile] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios.get('/api/profile').then(r => setProfile(r.data)).catch(() => {});
    axios.get('/api/achievements').then(r => setAchievements(r.data)).catch(() => {});
    axios.get('/api/testimonials').then(r => setTestimonials(r.data)).catch(() => {});
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
