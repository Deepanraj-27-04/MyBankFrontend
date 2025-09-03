import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BanknotesIcon } from '../components/ui/Icons';
import Button from '../components/ui/Button';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('alex.j@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Dummy password validation
      if (password !== 'password123') {
        throw new Error('Invalid email or password.');
      }
      await login(email);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
          <div className="text-center">
              <div className="flex justify-center mx-auto mb-4">
                  <BanknotesIcon className="h-12 w-12 text-primary" />
              </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to PQR Bank</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Sign in to access your dashboard.</p>
          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password"  className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>
          </form>
           <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>
                  Don't have an account?{' '}
                  <Link to="/register" className="font-medium text-primary hover:text-primary-500">
                    Sign up now
                  </Link>
              </p>
              <p className="mt-2">
                  Are you an administrator?{' '}
                  <Link to="/admin/login" className="font-medium text-primary hover:text-primary-500">
                      Admin Login
                  </Link>
              </p>
           </div>
      </div>
    </div>
  );
};

export default Login;