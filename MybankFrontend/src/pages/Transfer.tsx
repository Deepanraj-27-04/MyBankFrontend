import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import OTPModal from '../components/ui/OTPModal';
import { dummyAccounts } from '../data/dummy';
import { ArrowsRightLeftIcon, PaperAirplaneIcon, BanknotesIcon } from '../components/ui/Icons';

type ActiveTab = 'internal' | 'external' | 'withdraw';
type TransactionType = 'Transfer' | 'Payment' | 'Withdrawal';

const Transfer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('internal');
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentTransactionType, setCurrentTransactionType] = useState<TransactionType>('Transfer');

  // State for internal transfer
  const [internalFrom, setInternalFrom] = useState(dummyAccounts[0]?.id || '');
  const [internalTo, setInternalTo] = useState(dummyAccounts[1]?.id || '');
  const [internalAmount, setInternalAmount] = useState('');

  // State for external transfer
  const [externalFrom, setExternalFrom] = useState(dummyAccounts[0]?.id || '');
  const [externalTo, setExternalTo] = useState('');
  const [externalAmount, setExternalAmount] = useState('');
  
  // State for withdrawal
  const [withdrawFrom, setWithdrawFrom] = useState(dummyAccounts[0]?.id || '');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleInitiateTransaction = (e: React.FormEvent, type: TransactionType) => {
    e.preventDefault();
    // Basic validation
    let isValid = false;
    if (type === 'Transfer' && internalFrom && internalTo && internalAmount && parseFloat(internalAmount) > 0) {
      if (internalFrom === internalTo) {
        alert("Cannot transfer to the same account.");
        return;
      }
      isValid = true;
    } else if (type === 'Payment' && externalFrom && externalTo && externalAmount && parseFloat(externalAmount) > 0) {
      isValid = true;
    } else if (type === 'Withdrawal' && withdrawFrom && withdrawAmount && parseFloat(withdrawAmount) > 0) {
      isValid = true;
    }

    if (!isValid) {
      alert('Please fill in all fields correctly.');
      return;
    }
    
    setSuccessMessage('');
    setCurrentTransactionType(type);
    setIsOtpModalOpen(true);
  };
  
  const handleVerifyOtp = (otp: string) => {
    console.log('Verifying OTP:', otp);
    // Dummy OTP check
    if (otp === '123456') {
      setIsOtpModalOpen(false);
      setSuccessMessage(`${currentTransactionType} successful! The transaction has been processed.`);
      // Reset forms
      setInternalAmount('');
      setExternalTo('');
      setExternalAmount('');
      setWithdrawAmount('');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const TabButton = ({ tabName, label, icon }: { tabName: ActiveTab; label: string; icon: React.ReactNode }) => (
    <button
      onClick={() => { setActiveTab(tabName); setSuccessMessage(''); }}
      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-semibold border-b-2 transition-colors ${
        activeTab === tabName
          ? 'border-primary text-primary'
          : 'border-transparent text-gray-500 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <Card>
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Manage Funds</h2>
          
          <div className="flex border-b border-gray-200 dark:border-slate-700 mb-6">
            <TabButton tabName="internal" label="My Accounts" icon={<ArrowsRightLeftIcon className="w-5 h-5" />} />
            <TabButton tabName="external" label="To Person" icon={<PaperAirplaneIcon className="w-5 h-5" />} />
            <TabButton tabName="withdraw" label="Withdraw" icon={<BanknotesIcon className="w-5 h-5" />} />
          </div>

          {successMessage && (
            <div className="mb-6 p-4 text-center bg-success/10 text-success rounded-lg">
              {successMessage}
            </div>
          )}

          {/* Internal Transfer Form */}
          {activeTab === 'internal' && (
            <form onSubmit={(e) => handleInitiateTransaction(e, 'Transfer')} className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Transfer Between My Accounts</h3>
               <div>
                <label className="block text-sm font-medium">From</label>
                <select value={internalFrom} onChange={(e) => setInternalFrom(e.target.value)} className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                  {dummyAccounts.filter(acc => acc.type !== 'Loan').map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.type} - {acc.accountNumber} ({acc.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })})</option>
                  ))}
                </select>
              </div>
               <div>
                <label className="block text-sm font-medium">To</label>
                <select value={internalTo} onChange={(e) => setInternalTo(e.target.value)} className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                   {dummyAccounts.filter(acc => acc.type !== 'Loan').map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.type} - {acc.accountNumber}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Amount (USD)</label>
                <input type="number" value={internalAmount} onChange={(e) => setInternalAmount(e.target.value)} placeholder="0.00" className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary" />
              </div>
              <Button type="submit" className="w-full" size="lg">Transfer</Button>
            </form>
          )}

          {/* External Transfer Form */}
          {activeTab === 'external' && (
            <form onSubmit={(e) => handleInitiateTransaction(e, 'Payment')} className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Send Money to Someone</h3>
              <div>
                <label className="block text-sm font-medium">From</label>
                <select value={externalFrom} onChange={(e) => setExternalFrom(e.target.value)} className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                  {dummyAccounts.filter(acc => acc.type !== 'Loan').map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.type} - {acc.accountNumber} ({acc.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Beneficiary Account Number</label>
                <input type="text" value={externalTo} onChange={(e) => setExternalTo(e.target.value)} placeholder="Enter account number" className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium">Amount (USD)</label>
                <input type="number" value={externalAmount} onChange={(e) => setExternalAmount(e.target.value)} placeholder="0.00" className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary" />
              </div>
              <Button type="submit" className="w-full" size="lg">Send Payment</Button>
            </form>
          )}

          {/* Withdraw Form */}
          {activeTab === 'withdraw' && (
             <form onSubmit={(e) => handleInitiateTransaction(e, 'Withdrawal')} className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Withdraw Funds</h3>
              <div>
                <label className="block text-sm font-medium">From Account</label>
                <select value={withdrawFrom} onChange={(e) => setWithdrawFrom(e.target.value)} className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                   {dummyAccounts.filter(acc => acc.type !== 'Loan').map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.type} - {acc.accountNumber} ({acc.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })})</option>
                  ))}
                </select>
              </div>
               <div>
                <label className="block text-sm font-medium">Amount (USD)</label>
                <input type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} placeholder="0.00" className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary" />
              </div>
              <Button type="submit" className="w-full" size="lg">Initiate Withdrawal</Button>
            </form>
          )}

        </Card>
      </div>
      <OTPModal 
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onVerify={handleVerifyOtp}
      />
    </>
  );
};

export default Transfer;