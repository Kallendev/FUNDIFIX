import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '@/pages/login/LoginPage'
import RegisterPage from '@/pages/register/RegisterPage'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import LandingPage from "@/pages/landing/LandingPage"

export const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: '/', element: <DashboardPage /> }, 
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
])
