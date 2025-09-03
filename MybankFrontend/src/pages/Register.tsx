import React, { useState } from 'react';
// FIX: Use namespace import for react-router-dom to resolve export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { BanknotesIcon } from '../components/ui/Icons';
import Button from '../components/ui/Button';
import FileUpload from '../components/ui/FileUpload';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [kycFile, setKycFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = ReactRouterDOM.useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !password || !kycFile) {
      setError('All fields, including KYC document, are required.');
      return;
    }
    
    // In a real app, this would submit data to a backend.
    console.log({ name, email, password, kycFile });

    setSuccess('Registration successful! Your account is now pending admin verification. You will be notified once it is approved.');
    
    // Optionally redirect after a delay
    setTimeout(() => {
        navigate('/login');
    }, 5000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
          <div className="text-center">
              <div className="flex justify-center mx-auto mb-4">
                  <BanknotesIcon className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Create your Account</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Join PQR and take control of your finances.</p>
          </div>
          
          {success ? (
              <div className="text-center p-4 bg-success/10 text-success rounded-lg">
                  {success}
              </div>
          ) : (
              <form className="space-y-6" onSubmit={handleRegister}>
                  <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                      <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm" />
                  </div>
                  <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                      <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm" />
                  </div>
                  <div>
                      <label htmlFor="password"  className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                      <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm" />
                  </div>
                  
                  <FileUpload onFileSelect={setKycFile} />

                  {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                  
                  <div>
                      <Button type="submit" className="w-full" size="lg">Create Account</Button>
                  </div>
              </form>
          )}
           <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <ReactRouterDOM.Link to="/login" className="font-medium text-primary hover:text-primary-500">
                Sign in
              </ReactRouterDOM.Link>
            </p>
      </div>
    </div>
  );
};

export default Register;