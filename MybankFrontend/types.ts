export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export enum KYCStatus {
  PENDING = 'Pending',
  VERIFIED = 'Verified',
  REJECTED = 'Rejected',
}

export interface LoginDevice {
    id: string;
    browser: string;
    os: string;
    location: string;
    lastLogin: string;
}

export interface UserPreferences {
    notifications: {
        email: boolean;
        sms: boolean;
        push: boolean;
    };
    theme: {
        mode: 'light' | 'dark';
        color: 'blue' | 'teal';
    };
    language: string;
    currency: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  kycStatus: KYCStatus;
  kycDocumentUrl?: string;
  submissionDate?: string;
  phone?: string;
  address?: string;
  preferences?: UserPreferences;
  loginDevices?: LoginDevice[];
}

export interface Account {
  id:string;
  type: 'Savings' | 'Checking' | 'Loan';
  accountNumber: string;
  balance: number;
  currency: 'USD';
}

export enum TransactionType {
  DEBIT = 'Debit',
  CREDIT = 'Credit',
}

export enum TransactionStatus {
  COMPLETED = 'Completed',
  PENDING = 'Pending',
  FAILED = 'Failed',
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  status: TransactionStatus;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}