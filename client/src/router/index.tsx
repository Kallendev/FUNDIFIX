import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '@/pages/login/LoginPage'
import RegisterPage from '@/pages/register/RegisterPage'
import AdminDashboard from '@/pages/dashboard/AdminDashboard'
import ClientDashboard from '@/pages/dashboard/ClientDashboard'
import FundiDashboard from '@/pages/dashboard/FundiDashboard'
import LandingPage from '@/pages/landing/LandingPage'
import FundiPage from '@/pages/fundis/FundiPage'
import ProfilePage from '@/pages/fundis/ProfilePage'
import JobPage from '@/pages/jobs/JobPage'

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },

  // Dashboards
  { path: '/admin', element: <AdminDashboard /> },
  { path: '/client', element: <ClientDashboard /> },
  { path: '/fundi', element: <FundiDashboard /> },

  // Fundi-specific pages
  { path: '/fundi/profile', element: <ProfilePage /> },
  { path: '/fundi/jobs', element: <FundiPage /> },

  // Jobs page (general or client)
  { path: '/jobs', element: <JobPage /> },
])
