import React, { useState, useEffect } from 'react';
import Button from './Button';
import { User } from '../../types';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSave: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...user, name, email });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-md m-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit User</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Editing details for <span className="font-semibold">{user.name}</span>
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm"
              />
            </div>
             <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm"
              />
            </div>
            <div className="flex justify-end gap-4 pt-4">
                <Button type="button" onClick={onClose} variant="secondary">Cancel</Button>
                <Button type="submit">Save Changes</Button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;