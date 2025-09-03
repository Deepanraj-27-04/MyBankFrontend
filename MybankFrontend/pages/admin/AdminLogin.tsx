import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { BanknotesIcon } from '../../components/ui/Icons';
import Button from '../../components/ui/Button';

const AdminLogin: React.FC = () => {
  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@pqr.com');
  const [password, setPassword] = useState('adminpass');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@pqr.com' && password === 'adminpass') {
      adminLogin();
      navigate('/');
    } else {
      setError('Invalid admin credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-violet-50 dark:bg-slate-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
        <div className="text-center">
            <div className="flex justify-center mx-auto mb-4">
                <BanknotesIcon className="h-12 w-12 text-primary" />
            </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Portal</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Sign in to manage the banking platform.</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label htmlFor="password"  className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div>
            <Button type="submit" className="w-full" size="lg">
              Sign In as Admin
            </Button>
          </div>
        </form>
         <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Not an admin?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-500">
              Go to customer login
            </Link>
          </p>
      </div>
    </div>
  );
};

export default AdminLogin;