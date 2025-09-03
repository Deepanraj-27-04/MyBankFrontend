import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { dummyAccounts } from '../data/dummy';
import { Account } from '../types';
import Button from '../components/ui/Button';
import AddAccountModal from '../components/ui/AddAccountModal';

const AccountCard: React.FC<{ account: Account }> = ({ account }) => {
  const balanceColor = account.balance >= 0 ? 'text-gray-800 dark:text-white' : 'text-danger';
  
  const handleRemove = () => {
    alert(`In a real app, this would trigger a flow to remove account: ${account.accountNumber}`);
  }

  return (
    <Card className="flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{account.type}</h3>
          <span className="text-sm px-2 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/20">
            Active
          </span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-6">{account.accountNumber}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Current Balance</p>
        <p className={`text-3xl md:text-4xl font-bold ${balanceColor}`}>
          {account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2">
        <Button variant="primary" className="sm:col-span-2">View Details</Button>
        <Button variant="secondary">Statement</Button>
      </div>
       <div className="mt-2">
        <Button variant="danger" size="sm" className="w-full" onClick={handleRemove}>
            Remove Account
        </Button>
      </div>
    </Card>
  );
};

const Accounts: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>(dummyAccounts);

  const handleAddAccount = (accountData: { type: 'Savings' | 'Checking'; balance: number }) => {
    const newAccount: Account = {
      id: `acc_${new Date().getTime()}`,
      type: accountData.type,
      balance: accountData.balance,
      currency: 'USD',
      accountNumber: `**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setAccounts(prevAccounts => [...prevAccounts, newAccount]);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Your Accounts</h2>
          <Button onClick={() => setIsModalOpen(true)}>Add New Account</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
          <Card className="flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-slate-600 hover:border-primary dark:hover:border-primary transition-colors">
              <Button variant="secondary" onClick={() => setIsModalOpen(true)}>Add a new bank account</Button>
          </Card>
        </div>
      </div>
      <AddAccountModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddAccount={handleAddAccount}
      />
    </>
  );
};

export default Accounts;
