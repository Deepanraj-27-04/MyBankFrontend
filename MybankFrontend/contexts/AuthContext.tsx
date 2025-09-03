import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, KYCStatus, UserRole, ChatMessage } from '../types';
import { dummyUser, dummyAdmin } from '../data/dummy';

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  adminLogin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CHAT_HISTORY_KEY = 'pqrChatHistory';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string): Promise<void> => {
    // In a real app, you'd fetch user details by email
    if (email !== dummyUser.email) {
      throw new Error("User not found.");
    }
    if (dummyUser.kycStatus !== KYCStatus.VERIFIED) {
      throw new Error("Your account is pending verification. Please wait for an admin to approve it.");
    }
    setUser(dummyUser);
  };

  const adminLogin = () => {
    setUser(dummyAdmin);
  }

  const logout = () => {
    // Clear chat history on logout, but keep the last message
    try {
        const storedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
        if (storedHistory) {
            const history: ChatMessage[] = JSON.parse(storedHistory);
            if (history.length > 0) {
                const lastMessage = history[history.length - 1];
                localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify([lastMessage]));
            } else {
                 localStorage.removeItem(CHAT_HISTORY_KEY);
            }
        }
    } catch (error) {
        console.error("Could not process chat history on logout:", error);
        localStorage.removeItem(CHAT_HISTORY_KEY);
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};