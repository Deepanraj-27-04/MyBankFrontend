import React from 'react';
import { HomeIcon, WalletIcon, ArrowPathIcon, Cog6ToothIcon, QuestionMarkCircleIcon, PaperAirplaneIcon, InformationCircleIcon, PhoneIcon, UserGroupIcon, ShieldCheckIcon, ChatBubbleLeftRightIcon } from './components/ui/Icons';

export const NAV_ITEMS = [
  { path: 'dashboard', name: 'Dashboard', icon: <HomeIcon className="h-6 w-6" /> },
  { path: 'accounts', name: 'Accounts', icon: <WalletIcon className="h-6 w-6" /> },
  { path: 'transactions', name: 'Transactions', icon: <ArrowPathIcon className="h-6 w-6" /> },
  { path: 'transfer', name: 'Transfer', icon: <PaperAirplaneIcon className="h-6 w-6" /> },
  { path: 'chatbot', name: 'AI Assistant', icon: <ChatBubbleLeftRightIcon className="h-6 w-6" /> },
  { path: 'settings', name: 'Settings', icon: <Cog6ToothIcon className="h-6 w-6" /> },
];

export const SECONDARY_NAV_ITEMS = [
  { path: 'about', name: 'About Us', icon: <InformationCircleIcon className="h-6 w-6" /> },
  { path: 'contact', name: 'Contact Us', icon: <PhoneIcon className="h-6 w-6" /> },
  { path: 'support', name: 'Support', icon: <QuestionMarkCircleIcon className="h-6 w-6" /> },
]

export const ADMIN_NAV_ITEMS = [
  { path: 'dashboard', name: 'Dashboard', icon: <HomeIcon className="h-6 w-6" /> },
  { path: 'users', name: 'User Management', icon: <UserGroupIcon className="h-6 w-6" /> },
  { path: 'kyc', name: 'KYC Verification', icon: <ShieldCheckIcon className="h-6 w-6" /> },
  { path: 'settings', name: 'Settings', icon: <Cog6ToothIcon className="h-6 w-6" /> },
];