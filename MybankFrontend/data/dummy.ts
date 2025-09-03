import { User, Account, Transaction, TransactionType, TransactionStatus, UserRole, KYCStatus } from '../types';

const defaultPreferences = {
    notifications: { email: true, sms: false, push: true },
    theme: { mode: 'light' as const, color: 'blue' as const },
    language: 'en-US',
    currency: 'USD',
};

const defaultLoginDevices = [
    { id: 'dev_1', browser: 'Chrome', os: 'Windows 11', location: 'New York, USA', lastLogin: '2024-07-28T10:00:00Z' },
    { id: 'dev_2', browser: 'Safari', os: 'macOS Sonoma', location: 'London, UK', lastLogin: '2024-07-27T15:30:00Z' },
];

export const dummyAdmin: User = {
  id: 'admin_1',
  name: 'Admin User',
  email: 'admin@pqr.com',
  avatarUrl: `../images/me.jpg`,
  role: UserRole.ADMIN,
  kycStatus: KYCStatus.VERIFIED,
};

export const dummyUsers: User[] = [
    {
        id: 'usr_1',
        name: 'Deepanraj',
        email: 'Deepanraj@gmail.com',
        avatarUrl: `../images/spidy.jpg`,
        role: UserRole.USER,
        kycStatus: KYCStatus.VERIFIED,
        submissionDate: '2024-07-20T09:00:00Z',
        phone: '123-456-7890',
        address: '123 Main St, Anytown, USA',
        preferences: defaultPreferences,
        loginDevices: defaultLoginDevices,
    },
    {
        id: 'usr_2',
        name: 'Jane Doe',
        email: 'jane.d@example.com',
        avatarUrl: `https://i.pravatar.cc/150?u=janedoe`,
        role: UserRole.USER,
        kycStatus: KYCStatus.PENDING,
        kycDocumentUrl: '/docs/kyc_jane_doe.pdf',
        submissionDate: '2024-07-26T14:30:00Z',
    },
    {
        id: 'usr_3',
        name: 'Sam Wilson',
        email: 'sam.w@example.com',
        avatarUrl: `https://i.pravatar.cc/150?u=samwilson`,
        role: UserRole.USER,
        kycStatus: KYCStatus.REJECTED,
        submissionDate: '2024-07-22T11:00:00Z',
    },
    {
        id: 'usr_4',
        name: 'Maria Garcia',
        email: 'maria.g@example.com',
        avatarUrl: `https://i.pravatar.cc/150?u=mariagarcia`,
        role: UserRole.USER,
        kycStatus: KYCStatus.PENDING,
        kycDocumentUrl: '/docs/kyc_maria_garcia.pdf',
        submissionDate: '2024-07-27T08:45:00Z',
    },
    {
        id: 'usr_5',
        name: 'Ken Adams',
        email: 'ken.a@example.com',
        avatarUrl: `https://i.pravatar.cc/150?u=kenadams`,
        role: UserRole.USER,
        kycStatus: KYCStatus.PENDING,
        kycDocumentUrl: '/docs/kyc_ken_adams.pdf',
        submissionDate: '2024-07-27T10:15:00Z',
    },
    {
        id: 'usr_6',
        name: 'Olivia Chen',
        email: 'olivia.c@example.com',
        avatarUrl: `https://i.pravatar.cc/150?u=oliviachen`,
        role: UserRole.USER,
        kycStatus: KYCStatus.VERIFIED,
        submissionDate: '2024-07-15T18:00:00Z',
    }
];

export const dummyUser = dummyUsers[0];


export const dummyAccounts: Account[] = [
  {
    id: 'acc_1',
    type: 'Checking',
    accountNumber: '**** **** **** 1234',
    balance: 5250.75,
    currency: 'USD',
  },
  {
    id: 'acc_2',
    type: 'Savings',
    accountNumber: '**** **** **** 5678',
    balance: 22800.0,
    currency: 'USD',
  },
   {
    id: 'acc_3',
    type: 'Loan',
    accountNumber: '**** **** **** 9012',
    balance: -15000.0,
    currency: 'USD',
  },
];

export const dummyTransactions: Transaction[] = [
  { id: 'txn_1', date: '2024-07-26', description: 'Salary Deposit', amount: 3500.0, type: TransactionType.CREDIT, category: 'Income', status: TransactionStatus.COMPLETED },
  { id: 'txn_2', date: '2024-07-25', description: 'Groceries Store', amount: -150.25, type: TransactionType.DEBIT, category: 'Food', status: TransactionStatus.COMPLETED },
  { id: 'txn_3', date: '2024-07-24', description: 'Online Shopping - Tech Gadgets', amount: -499.99, type: TransactionType.DEBIT, category: 'Shopping', status: TransactionStatus.COMPLETED },
  { id: 'txn_4', date: '2024-07-23', description: 'Utility Bill Payment', amount: -75.50, type: TransactionType.DEBIT, category: 'Bills', status: TransactionStatus.COMPLETED },
  { id: 'txn_5', date: '2024-07-22', description: 'Transfer from Jane Doe', amount: 200.0, type: TransactionType.CREDIT, category: 'Transfers', status: TransactionStatus.COMPLETED },
  { id: 'txn_6', date: '2024-07-21', description: 'Restaurant - Dinner with friends', amount: -85.00, type: TransactionType.DEBIT, category: 'Food', status: TransactionStatus.PENDING },
  { id: 'txn_7', date: '2024-07-20', description: 'ATM Withdrawal', amount: -100.00, type: TransactionType.DEBIT, category: 'Cash', status: TransactionStatus.COMPLETED },
  { id: 'txn_8', date: '2024-07-19', description: 'Movie Tickets', amount: -30.00, type: TransactionType.DEBIT, category: 'Entertainment', status: TransactionStatus.COMPLETED },
  { id: 'txn_9', date: '2024-07-18', description: 'Subscription Service', amount: -15.99, type: TransactionType.DEBIT, category: 'Subscriptions', status: TransactionStatus.FAILED },
  { id: 'txn_10', date: '2024-07-17', description: 'Stock Investment', amount: -1000.00, type: TransactionType.DEBIT, category: 'Investments', status: TransactionStatus.COMPLETED },
  { id: 'txn_11', date: '2024-07-16', description: 'Refund from Online Store', amount: 55.00, type: TransactionType.CREDIT, category: 'Refunds', status: TransactionStatus.COMPLETED },
  { id: 'txn_12', date: '2024-07-15', description: 'Car Payment', amount: -350.00, type: TransactionType.DEBIT, category: 'Auto', status: TransactionStatus.COMPLETED },
  { id: 'txn_13', date: '2024-07-12', description: 'Gas Station', amount: -45.67, type: TransactionType.DEBIT, category: 'Transport', status: TransactionStatus.COMPLETED },
  { id: 'txn_14', date: '2024-07-10', description: 'Bookstore', amount: -25.00, type: TransactionType.DEBIT, category: 'Shopping', status: TransactionStatus.COMPLETED },
  { id: 'txn_15', date: '2024-07-08', description: 'Coffee Shop', amount: -5.75, type: TransactionType.DEBIT, category: 'Food', status: TransactionStatus.COMPLETED },
  { id: 'txn_16', date: '2024-07-05', description: 'Gym Membership', amount: -40.00, type: TransactionType.DEBIT, category: 'Health', status: TransactionStatus.COMPLETED },
  { id: 'txn_17', date: '2024-07-01', description: 'Rent Payment', amount: -1200.00, type: TransactionType.DEBIT, category: 'Housing', status: TransactionStatus.COMPLETED },
];