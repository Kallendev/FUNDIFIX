import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';

import AdminDashboard from './pages/dashboard/AdminDashboard';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import FundiDashboard from './pages/dashboard/FundiDashboard';

import JobPage from './pages/jobs/JobPage';
import FundiPage from './pages/fundis/FundiPage';
import ProfilePage from './pages/fundis/ProfilePage'; // ✅ <-- You forgot this!

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboards */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/fundi" element={<FundiDashboard />} />

        {/* Extra Pages */}
        <Route path="/jobs" element={<JobPage />} />
        <Route path="/fundis" element={<FundiPage />} />
        <Route path="/fundi/profile" element={<ProfilePage />} /> {/* ✅ Add this */}
      </Routes>
    </Router>
  );
};

export default App;
