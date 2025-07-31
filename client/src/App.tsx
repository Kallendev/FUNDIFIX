import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';

import AdminDashboard from './pages/dashboard/AdminDashboard';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import FundiDashboard from './pages/dashboard/FundiDashboard';

import JobPage from './pages/jobs/JobPage';
import FundiPage from './pages/fundis/FundiPage';
import ClientsPage from './pages/clients/ClientsPage.tsx';
import ProfilePage from './pages/fundis/ProfilePage.tsx';

import SchedulePage from './pages/fundis/SchedulePage.tsx';
import EarningsPage from './pages/fundis/EarningsPage.tsx';
import MessagesPage from './pages/fundis/MessagesPage.tsx';

import PostJobPage from './pages/clients/PostJobPage.tsx';
import MessagesTab from './pages/clients/MessagesTab.tsx';
import MyRequestsTab from './pages/clients/MyRequestsTab.tsx';
import PaymentsTab from './pages/clients/PaymentsTab.tsx';

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
        <Route path="/fundi/jobs" element={<JobPage />} />
        <Route path="/fundis" element={<FundiPage />} />
        <Route path="/fundi/profile" element={<ProfilePage />} />
        <Route path="/admin/jobs" element={<JobPage />} />
        <Route path="/admin/fundis" element={<FundiPage />} />
        <Route path="/admin/clients" element={<ClientsPage />} />

        <Route path="/fundi/schedule" element={<SchedulePage />} />
        <Route path="/fundi/earnings" element={<EarningsPage />} />
        <Route path="/fundi/messages" element={<MessagesPage />} />
        <Route path="/client/post-job" element={<PostJobPage />} />
        <Route path="/client/messages" element={<MessagesTab />} />
        <Route path="/client/requests" element={<MyRequestsTab />} />
        <Route path="/client/payments" element={<PaymentsTab />} />

        {/* Catch-all Route */}

      </Routes>
    </Router>
  );
};

export default App;
