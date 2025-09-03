import React, { useState } from 'react';
import Button from './Button';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAccount: (accountData: { type: 'Savings' | 'Checking'; balance: number }) => void;
}

const AddAccountModal: React.FC<AddAccountModalProps> = ({ isOpen, onClose, onAddAccount }) => {
  const [accountType, setAccountType] = useState<'Savings' | 'Checking'>('Savings');
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const initialDeposit = parseFloat(balance);
    if (isNaN(initialDeposit) || initialDeposit < 0) {
      setError('Please enter a valid positive number for the initial deposit.');
      return;
    }
    setError('');
    onAddAccount({ type: accountType, balance: initialDeposit });
    // Reset form and close
    setBalance('');
    setAccountType('Savings');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-md m-4" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Add New Account</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Choose an account type and make an initial deposit.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Account Type
              </label>
              <select
                id="accountType"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value as 'Savings' | 'Checking')}
                className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="Savings">Savings Account</option>
                <option value="Checking">Checking Account</option>
              </select>
            </div>
             <div>
              <label htmlFor="balance" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Initial Deposit (USD)
              </label>
              <input
                id="balance"
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                min="0"
                step="0.01"
                placeholder="e.g., 500.00"
                className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-4 pt-4">
                <Button type="button" onClick={onClose} variant="secondary" className="w-full sm:w-auto">Cancel</Button>
                <Button type="submit" className="w-full sm:w-auto">Create Account</Button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccountModal;