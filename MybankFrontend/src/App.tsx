
import React from 'react';
// FIX: Use namespace import for react-router-dom to resolve export errors.
import * as ReactRouterDOM from 'react-router-dom';
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
      <ReactRouterDOM.HashRouter>
        <ReactRouterDOM.Routes>
          {!user ? (
            // PUBLIC ROUTES
            <>
              <ReactRouterDOM.Route path="/" element={<HomePage />} />
              <ReactRouterDOM.Route path="/login" element={<Login />} />
              <ReactRouterDOM.Route path="/register" element={<Register />} />
              <ReactRouterDOM.Route path="/admin/login" element={<AdminLogin />} />
              <ReactRouterDOM.Route path="*" element={<ReactRouterDOM.Navigate to="/" replace />} />
            </>
          ) : user.role === UserRole.ADMIN ? (
            // ADMIN ROUTES
            <ReactRouterDOM.Route path="/" element={<AdminLayout />}>
              <ReactRouterDOM.Route index element={<ReactRouterDOM.Navigate to="/dashboard" replace />} />
              <ReactRouterDOM.Route path="dashboard" element={<AdminDashboard />} />
              <ReactRouterDOM.Route path="users" element={<UserManagement />} />
              <ReactRouterDOM.Route path="kyc" element={<KYCVerification />} />
              <ReactRouterDOM.Route path="settings" element={<AdminSettings />} />
              <ReactRouterDOM.Route path="*" element={<ReactRouterDOM.Navigate to="/dashboard" replace />} />
            </ReactRouterDOM.Route>
          ) : (
            // USER ROUTES
            <ReactRouterDOM.Route path="/" element={<MainLayout />}>
              <ReactRouterDOM.Route index element={<ReactRouterDOM.Navigate to="/dashboard" replace />} />
              <ReactRouterDOM.Route path="dashboard" element={<Dashboard />} />
              <ReactRouterDOM.Route path="accounts" element={<Accounts />} />
              <ReactRouterDOM.Route path="transactions" element={<Transactions />} />
              <ReactRouterDOM.Route path="transfer" element={<Transfer />} />
              <ReactRouterDOM.Route path="settings" element={<Settings />} />
              <ReactRouterDOM.Route path="about" element={<AboutUs />} />
              <ReactRouterDOM.Route path="contact" element={<ContactUs />} />
              <ReactRouterDOM.Route path="support" element={<Support />} />
              <ReactRouterDOM.Route path="chatbot" element={<Chatbot />} />
              <ReactRouterDOM.Route path="*" element={<ReactRouterDOM.Navigate to="/dashboard" replace />} />
            </ReactRouterDOM.Route>
          )}
        </ReactRouterDOM.Routes>
      </ReactRouterDOM.HashRouter>
    );
};

export default App;
