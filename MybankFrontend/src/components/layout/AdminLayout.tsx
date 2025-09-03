
import React, { useState } from 'react';
// FIX: Use namespace import for react-router-dom to resolve export errors.
import * as ReactRouterDOM from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Header from './Header';
import { ADMIN_NAV_ITEMS } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowRightOnRectangleIcon, XMarkIcon } from '../ui/Icons';


const MobileAdminSidebar: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    const { logout } = useAuth();
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-3 text-lg rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-primary/10 text-primary-text dark:bg-primary/20'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
    }`;
    
    return (
        <>
            <div className={`fixed inset-0 z-30 bg-black/50 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
            <aside className={`fixed top-0 left-0 z-40 h-full w-64 bg-white dark:bg-slate-800 transform transition-transform md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                 <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200 dark:border-slate-700">
                    <span className="text-xl font-bold text-gray-800 dark:text-white">PQR Admin</span>
                    <button onClick={onClose} className="p-2">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex flex-col justify-between flex-1 h-[calc(100%-5rem)]">
                    <nav className="px-4 py-6 space-y-2">
                        {ADMIN_NAV_ITEMS.map((item) => (
                            <ReactRouterDOM.NavLink key={item.path} to={item.path} className={navLinkClass} onClick={onClose}>
                                {item.icon}
                                <span className="ml-4">{item.name}</span>
                            </ReactRouterDOM.NavLink>
                        ))}
                    </nav>
                     <div className="px-4 py-6">
                        <div className="mt-6 border-t border-gray-200 dark:border-slate-700 pt-6">
                            <button onClick={logout} className="w-full flex items-center px-4 py-3 text-lg text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700">
                                <ArrowRightOnRectangleIcon className="w-6 h-6" />
                                <span className="ml-4">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

const AdminLayout: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen text-gray-800 dark:text-gray-200 relative">
      // <iframe src='https://my.spline.design/wallet-wx2MpTD6SoVElZcY7TPj9gSY/' frameBorder='0' width='100%' height='100%' className="absolute top-0 left-0 w-full h-full -z-10"></iframe>
      <AdminSidebar />
      <MobileAdminSidebar isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuButtonClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 bg-white/30 dark:bg-slate-900/50 backdrop-blur-md">
          <ReactRouterDOM.Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
