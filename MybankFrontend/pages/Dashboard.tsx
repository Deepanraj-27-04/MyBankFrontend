import React from 'react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  CartesianGrid,
} from 'recharts';
import Card from '../components/ui/Card';
import { dummyAccounts, dummyTransactions, dummyUser } from '../data/dummy';
import { Transaction, TransactionType, Account } from '../types';
import { ArrowDownCircleIcon, ArrowUpCircleIcon, PaperAirplaneIcon, ReceiptPercentIcon, ArrowDownTrayIcon, DocumentTextIcon } from '../components/ui/Icons';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const TransactionRow = ({ tx }: { tx: Transaction }) => {
  const isCredit = tx.type === TransactionType.CREDIT;
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-slate-700 last:border-b-0">
      <div className="flex items-center">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isCredit ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
          {isCredit ? <ArrowDownCircleIcon className="h-6 w-6" /> : <ArrowUpCircleIcon className="h-6 w-6" />}
        </div>
        <div className="ml-4">
          <div className="font-medium text-gray-800 dark:text-gray-200">{tx.description}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{tx.date}</div>
        </div>
      </div>
      <div className={`font-semibold ${isCredit ? 'text-success' : 'text-danger'}`}>
        {isCredit ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </div>
    </div>
  );
};

const QuickAction: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => (
    <Link to={to} className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 space-y-2">
        <div className="p-3 bg-primary/10 rounded-full text-primary-text">{icon}</div>
        <span className="font-semibold text-gray-700 dark:text-gray-300">{label}</span>
    </Link>
)

const AccountCard: React.FC<{ account: Account }> = ({ account }) => (
    <Card className="flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-semibold">{account.type}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{account.accountNumber}</p>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
            Active
          </span>
        </div>
        <p className={`text-2xl md:text-3xl font-bold mt-4 ${account.balance >= 0 ? 'text-gray-800 dark:text-white' : 'text-danger'}`}>
          {account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </p>
      </div>
    </Card>
);


const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const { themeMode } = useTheme();

    const chartData = [
        { name: 'Jan', spending: 4000 }, { name: 'Feb', spending: 3000 },
        { name: 'Mar', spending: 5000 }, { name: 'Apr', spending: 4500 },
        { name: 'May', spending: 6000 }, { name: 'Jun', spending: 5500 },
        { name: 'Jul', spending: Math.abs(dummyTransactions.filter(t => t.type === 'Debit').reduce((sum, t) => sum + t.amount, 0)) },
    ];

    const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

    return (
        <div className="space-y-6">
            <div className="p-8 rounded-xl bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
                <h1 className="text-3xl font-bold">Welcome back, {user?.name.split(' ')[0]}!</h1>
                <p className="mt-2 text-lg opacity-90">Here's your financial overview for today.</p>
            </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <QuickAction to="/transfer" icon={<PaperAirplaneIcon className="h-7 w-7"/>} label="Transfer" />
                <QuickAction to="/transactions" icon={<ReceiptPercentIcon className="h-7 w-7"/>} label="Pay Bills" />
                <QuickAction to="/transfer" icon={<ArrowDownTrayIcon className="h-7 w-7"/>} label="Deposit" />
                <QuickAction to="/accounts" icon={<DocumentTextIcon className="h-7 w-7"/>} label="Statement" />
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">My Accounts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dummyAccounts.map(acc => <AccountCard key={acc.id} account={acc} />)}
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Spending Analysis</h3>
                     <div className="w-full h-[300px]">
                        <ResponsiveContainer>
                            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="rgb(var(--color-primary-500))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="rgb(var(--color-primary-500))" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke={themeMode === 'dark' ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"} />
                                <XAxis dataKey="name" stroke={themeMode === 'dark' ? "#94a3b8" : "#6b7280"} />
                                <YAxis stroke={themeMode === 'dark' ? "#94a3b8" : "#6b7280"} tickFormatter={formatCurrency} />
                                <Tooltip
                                    contentStyle={{ 
                                        backgroundColor: themeMode === 'dark' ? '#1e293b' : '#ffffff',
                                        borderColor: themeMode === 'dark' ? '#334155' : '#e5e7eb',
                                    }}
                                />
                                <Area type="monotone" dataKey="spending" stroke="rgb(var(--color-primary-500))" fillOpacity={1} fill="url(#colorSpending)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
                    <div className="space-y-2">
                        {dummyTransactions.slice(0, 4).map(tx => (
                           <TransactionRow key={tx.id} tx={tx} />
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
