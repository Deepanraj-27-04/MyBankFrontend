
import React, { useState, useEffect, useRef } from 'react';
// FIX: Use namespace import for react-router-dom to resolve export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { NAV_ITEMS, ADMIN_NAV_ITEMS } from '../../constants';
import { SunIcon, MoonIcon, BellIcon, MagnifyingGlassIcon, Bars3Icon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '../ui/Icons';
import { UserRole } from '../../types';

interface HeaderProps {
    onMenuButtonClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuButtonClick }) => {
  const { user, logout } = useAuth();
  const { themeMode, toggleThemeMode } = useTheme();
  const location = ReactRouterDOM.useLocation();
  const [isProfileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const getPageTitle = () => {
      const allNavItems = user?.role === UserRole.ADMIN ? ADMIN_NAV_ITEMS : NAV_ITEMS;
      const currentPath = location.pathname.split('/').pop() || 'dashboard';
      const currentPage = allNavItems.find(item => item.path === currentPath);
      return currentPage ? currentPage.name : 'Welcome';
  }

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
            setProfileOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex-shrink-0 flex items-center justify-between h-20 px-4 sm:px-6 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
       <div className="flex items-center">
            <button onClick={onMenuButtonClick} className="md:hidden mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
                <Bars3Icon className="h-6 w-6" />
            </button>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">{getPageTitle()}</h1>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="relative hidden md:block">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-100 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button onClick={toggleThemeMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
          {themeMode === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
          <BellIcon className="h-6 w-6" />
        </button>
        
        <div className="relative" ref={profileRef}>
            <button onClick={() => setProfileOpen(!isProfileOpen)} className="flex items-center space-x-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700">
              <img src={user?.avatarUrl} alt="User Avatar" className="h-10 w-10 rounded-full" />
              <div className="hidden sm:block">
                <div className="font-semibold text-gray-800 dark:text-white">{user?.name}</div>
              </div>
            </button>

            {isProfileOpen && (
                 <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-xl z-20 border border-gray-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                        <div className="flex items-center">
                            <img src={user?.avatarUrl} alt="User Avatar" className="h-12 w-12 rounded-full" />
                            <div className="ml-3">
                                <p className="font-semibold text-gray-800 dark:text-white">{user?.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <ReactRouterDOM.Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center w-full px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md">
                           <Cog6ToothIcon className="h-5 w-5 mr-3"/> Settings
                        </ReactRouterDOM.Link>
                         <button onClick={logout} className="flex items-center w-full px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md">
                           <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3"/> Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
