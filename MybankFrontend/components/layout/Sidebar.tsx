import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS, SECONDARY_NAV_ITEMS } from '../../constants';
import { BuildingLibraryIcon, ArrowRightOnRectangleIcon } from '../ui/Icons';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 text-lg rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-primary/10 text-primary-text dark:bg-primary/20'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
    }`;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700">
      <NavLink to="/" className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-slate-700">
        <BuildingLibraryIcon className="h-8 w-8 text-primary-text" />
        <span className="ml-2 text-2xl font-bold text-gray-800 dark:text-white">PQR Bank</span>
      </NavLink>
      <div className="flex flex-col justify-between flex-1">
        <nav className="px-4 py-6 space-y-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={navLinkClass}
            >
              {item.icon}
              <span className="ml-4">{item.name}</span>
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-6">
           <div className="mb-4 border-t border-gray-200 dark:border-slate-700"></div>
           <nav className="space-y-2">
                {SECONDARY_NAV_ITEMS.map((item) => (
                    <NavLink
                    key={item.path}
                    to={item.path}
                    className={navLinkClass}
                    >
                    {item.icon}
                    <span className="ml-4">{item.name}</span>
                    </NavLink>
                ))}
           </nav>
           <div className="mt-6">
                <button
                onClick={logout}
                className="w-full flex items-center px-4 py-3 text-lg text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                <ArrowRightOnRectangleIcon className="w-6 h-6" />
                <span className="ml-4">Logout</span>
                </button>
           </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;