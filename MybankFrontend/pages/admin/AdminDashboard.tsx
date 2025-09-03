import React from 'react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell,
} from 'recharts';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { dummyUsers, dummyTransactions, dummyAccounts } from '../../data/dummy';
import { KYCStatus, Transaction, TransactionStatus } from '../../types';
import { 
    UserGroupIcon, 
    CurrencyDollarIcon, 
    ArrowPathIcon, 
    ShieldCheckIcon,
    UserPlusIcon,
    CheckBadgeIcon,
    NoSymbolIcon,
    ShieldExclamationIcon,
} from '../../components/ui/Icons';
import { useTheme } from '../../contexts/ThemeContext';

// --- Data for Charts ---
const customerGrowthData = [
    { name: 'Jan', users: 120 }, { name: 'Feb', users: 180 }, { name: 'Mar', users: 250 },
    { name: 'Apr', users: 310 }, { name: 'May', users: 450 }, { name: 'Jun', users: 600 },
];
const transactionVolumeData = [
    { name: 'Mon', volume: 2400 }, { name: 'Tue', volume: 1398 }, { name: 'Wed', volume: 9800 },
    { name: 'Thu', volume: 3908 }, { name: 'Fri', volume: 4800 }, { name: 'Sat', volume: 3800 },
];
const accountTypeData = [
    { name: 'Checking', value: 400 }, { name: 'Savings', value: 300 }, { name: 'Loan', value: 150 },
];
const topCustomersData = [
    { name: 'Alex J.', balance: 28050.75 }, { name: 'Olivia C.', balance: 21500.00 },
    { name: 'User 3', balance: 18900.20 }, { name: 'User 4', balance: 15230.50 },
    { name: 'User 5', balance: 12100.00 },
];
const COLORS = ['#2563EB', '#7C3AED', '#16A34A']; // Primary Blue, Secondary Purple, Success Green


const StatCard = ({ title, value, icon, gradient }: { title: string, value: string, icon: React.ReactNode, gradient: string }) => (
    <div className={`p-6 rounded-xl text-white shadow-lg ${gradient}`}>
        <div className="flex justify-between items-center">
            <div>
                <p className="text-lg font-medium opacity-90">{title}</p>
                <p className="text-4xl font-bold">{value}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">{icon}</div>
        </div>
    </div>
)

const AdminDashboard: React.FC = () => {
    const { themeMode } = useTheme();
    const totalDeposits = dummyAccounts.reduce((sum, acc) => sum + (acc.balance > 0 ? acc.balance : 0), 0);
    const pendingKYC = dummyUsers.filter(u => u.kycStatus === KYCStatus.PENDING).length;

    const getStatusColor = (status: TransactionStatus) => {
        if (status === TransactionStatus.COMPLETED) return "text-success";
        if (status === TransactionStatus.PENDING) return "text-warning";
        return "text-danger";
    }

    return (
        <div className="space-y-8">
            <div className="p-4 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center">
                 <ShieldCheckIcon className="h-6 w-6 text-success mr-3"/>
                 <p className="font-semibold text-gray-800 dark:text-gray-200">System Health: All systems operational.</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Customers" value={dummyUsers.length.toString()} icon={<UserGroupIcon className="h-8 w-8"/>} gradient="bg-gradient-to-r from-blue-500 to-blue-600" />
                <StatCard title="Total Deposits" value={`$${(totalDeposits / 1_000_000).toFixed(1)}M`} icon={<CurrencyDollarIcon className="h-8 w-8"/>} gradient="bg-gradient-to-r from-purple-500 to-purple-600" />
                <StatCard title="Transactions Today" value={dummyTransactions.slice(0, 5).length.toString()} icon={<ArrowPathIcon className="h-8 w-8"/>} gradient="bg-gradient-to-r from-green-500 to-green-600" />
                <StatCard title="Pending KYC" value={pendingKYC.toString()} icon={<ShieldExclamationIcon className="h-8 w-8"/>} gradient="bg-gradient-to-r from-amber-500 to-amber-600" />
            </div>

            {/* Charts & Graphs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <Card>
                    <h3 className="text-xl font-semibold mb-4">Customer Growth</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={customerGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                            <XAxis dataKey="name" stroke={themeMode === 'dark' ? '#94a3b8' : '#6b7280'} />
                            <YAxis stroke={themeMode === 'dark' ? '#94a3b8' : '#6b7280'} />
                            <Tooltip contentStyle={{ backgroundColor: themeMode === 'dark' ? '#1e293b' : '#ffffff', border: '1px solid #334155' }} />
                            <Legend />
                            <Line type="monotone" dataKey="users" stroke="rgb(var(--color-primary-500))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
                 <Card>
                    <h3 className="text-xl font-semibold mb-4">Transaction Volume (This Week)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={transactionVolumeData}>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2}/>
                            <XAxis dataKey="name" stroke={themeMode === 'dark' ? '#94a3b8' : '#6b7280'} />
                            <YAxis stroke={themeMode === 'dark' ? '#94a3b8' : '#6b7280'} />
                            <Tooltip contentStyle={{ backgroundColor: themeMode === 'dark' ? '#1e293b' : '#ffffff', border: '1px solid #334155' }} />
                            <Legend />
                            <Bar dataKey="volume" fill="rgb(var(--color-secondary-500))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
                 <Card>
                    <h3 className="text-xl font-semibold mb-4">Accounts by Type</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={accountTypeData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                {accountTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: themeMode === 'dark' ? '#1e293b' : '#ffffff' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
                 <Card>
                    <h3 className="text-xl font-semibold mb-4">Top Customers by Balance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart layout="vertical" data={topCustomersData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2}/>
                            <XAxis type="number" stroke={themeMode === 'dark' ? '#94a3b8' : '#6b7280'} />
                            <YAxis dataKey="name" type="category" stroke={themeMode === 'dark' ? '#94a3b8' : '#6b7280'} />
                            <Tooltip contentStyle={{ backgroundColor: themeMode === 'dark' ? '#1e293b' : '#ffffff' }} />
                            <Bar dataKey="balance" fill="rgb(var(--color-primary-500))" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
                    <div className="overflow-x-auto">
                         <table className="min-w-full">
                            <tbody>
                                {dummyTransactions.slice(0, 5).map((tx: Transaction) => (
                                    <tr key={tx.id} className="border-b border-gray-200 dark:border-slate-700 last:border-0">
                                        <td className="py-3 pr-4">{tx.description}</td>
                                        <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{tx.date}</td>
                                        <td className={`py-3 pl-4 font-semibold ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>{tx.amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                                        <td className="py-3 pl-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(tx.status)}`}>{tx.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
                <Card>
                    <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <Button className="w-full justify-start"><UserPlusIcon className="h-5 w-5 mr-3"/> Add New Customer</Button>
                        <Link to="/kyc" className="w-full">
                            <Button className="w-full justify-start" variant="secondary"><CheckBadgeIcon className="h-5 w-5 mr-3"/> Approve Pending Accounts</Button>
                        </Link>
                        <Button className="w-full justify-start" variant="danger"><NoSymbolIcon className="h-5 w-5 mr-3"/> Revoke Access</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
