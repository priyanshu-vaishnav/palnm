import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Portfolio from './pages/Portfolio';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProfile from './pages/AdminProfile';
import AdminLeads from './pages/AdminLeads';
import AdminTestimonials from './pages/AdminTestimonials';
import AdminAchievements from './pages/AdminAchievements';
import AdminLayout from './components/AdminLayout';

const PrivateRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();
  if (loading) return <div style={{ display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',color:'#C9A84C',fontSize:'1.2rem' }}>Loading...</div>;
  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

export default function App() {
  return (
    <Routes>
      {/* Public Portfolio */}
      <Route path="/" element={<Portfolio />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin Panel */}
      <Route path="/admin" element={
        <PrivateRoute><AdminLayout /></PrivateRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="achievements" element={<AdminAchievements />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
