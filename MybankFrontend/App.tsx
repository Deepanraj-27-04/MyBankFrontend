
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserRole } from './types';

// Layouts
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/admin/AdminLogin';

// User Pages
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import Transfer from './pages/Transfer';
import Settings from './pages/Settings';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Support from './pages/Support';
import Chatbot from './pages/Chatbot';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import KYCVerification from './pages/admin/KYCVerification';
import AdminSettings from './pages/admin/AdminSettings';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
    const { user } = useAuth();

    return (
      <HashRouter>
        <Routes>
          {!user ? (
            // PUBLIC ROUTES
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : user.role === UserRole.ADMIN ? (
            // ADMIN ROUTES
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="kyc" element={<KYCVerification />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          ) : (
            // USER ROUTES
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="accounts" element={<Accounts />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="transfer" element={<Transfer />} />
              <Route path="settings" element={<Settings />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="contact" element={<ContactUs />} />
              <Route path="support" element={<Support />} />
              <Route path="chatbot" element={<Chatbot />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          )}
        </Routes>
      </HashRouter>
    );
};

export default App;