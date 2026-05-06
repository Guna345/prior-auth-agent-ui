import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import WelcomePage from './pages/auth/WelcomePage'
import LoginPage from './pages/auth/LoginPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import AirHandlingPage from './pages/air-handling/AirHandlingPage'
import CaseDetailPage from './pages/air-handling/CaseDetailPage'
import UserManagementPage from './pages/users/UserManagementPage'
import ConfigurationPage from './pages/configuration/ConfigurationPage'
import AppLayout from './components/layout/AppLayout'
import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected app routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <DashboardPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/air-handling"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <AirHandlingPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/air-handling/:caseId"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <CaseDetailPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-management"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <UserManagementPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/configuration"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <ConfigurationPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
