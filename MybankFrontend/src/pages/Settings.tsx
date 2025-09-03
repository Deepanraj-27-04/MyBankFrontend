import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { CheckIcon, TrashIcon } from '../components/ui/Icons';

type SettingsTab = 'profile' | 'security' | 'notifications' | 'appearance';

// A reusable ToggleSwitch component defined within the same file for simplicity
const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void }> = ({ enabled, onChange }) => (
  <button
    type="button"
    className={`${enabled ? 'bg-primary' : 'bg-gray-200 dark:bg-slate-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
    onClick={() => onChange(!enabled)}
  >
    <span className={`${enabled ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
  </button>
);

const Settings: React.FC = () => {
    const { user } = useAuth();
    const { themeMode, colorTheme, toggleThemeMode, setColorTheme } = useTheme();
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

    const TabButton: React.FC<{ tab: SettingsTab; children: React.ReactNode }> = ({ tab, children }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 font-semibold text-sm rounded-md ${activeTab === tab ? 'bg-primary/10 text-primary-text' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
        >
            {children}
        </button>
    );

  if (!user || !user.preferences) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-slate-700 pb-2">
            <TabButton tab="profile">Profile</TabButton>
            <TabButton tab="security">Security</TabButton>
            <TabButton tab="notifications">Notifications</TabButton>
            <TabButton tab="appearance">Appearance</TabButton>
        </div>

        {activeTab === 'profile' && (
            <Card>
                <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <input type="text" defaultValue={user.name} className="mt-1 input-style" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input type="email" defaultValue={user.email} className="mt-1 input-style" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                        <input type="tel" defaultValue={user.phone} className="mt-1 input-style" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                        <input type="text" defaultValue={user.address} className="mt-1 input-style" />
                    </div>
                    <div className="md:col-span-2 text-right">
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </Card>
        )}

        {activeTab === 'security' && (
             <Card>
                <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                <div className="space-y-8">
                    <div>
                        <h3 className="text-lg font-medium">Change Password</h3>
                        <form className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="password" placeholder="Current Password" required className="input-style" />
                            <input type="password" placeholder="New Password" required className="input-style" />
                            <div className="md:col-span-2 text-right">
                               <Button>Update Password</Button>
                            </div>
                        </form>
                    </div>
                     <div className="border-t border-gray-200 dark:border-slate-700 my-6"></div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium">Two-Factor Authentication (2FA)</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account.</p>
                        </div>
                        <ToggleSwitch enabled={true} onChange={() => {}} />
                    </div>
                     <div className="border-t border-gray-200 dark:border-slate-700 my-6"></div>
                     <div>
                        <h3 className="text-lg font-medium mb-4">Login Devices</h3>
                        <div className="space-y-4">
                            {user.loginDevices?.map(device => (
                                <div key={device.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                                    <div>
                                        <p className="font-semibold">{device.browser} on {device.os}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{device.location} - Last login: {new Date(device.lastLogin).toLocaleString()}</p>
                                    </div>
                                    <Button variant="danger" size="sm" className="mt-2 sm:mt-0"><TrashIcon className="h-4 w-4 mr-1" />Remove</Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        )}

        {activeTab === 'notifications' && (
            <Card>
                <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <p>Email Notifications</p>
                        <ToggleSwitch enabled={user.preferences.notifications.email} onChange={() => {}} />
                    </div>
                    <div className="flex items-center justify-between">
                        <p>SMS Notifications</p>
                        <ToggleSwitch enabled={user.preferences.notifications.sms} onChange={() => {}} />
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Push Notifications</p>
                        <ToggleSwitch enabled={user.preferences.notifications.push} onChange={() => {}} />
                    </div>
                </div>
            </Card>
        )}

        {activeTab === 'appearance' && (
             <Card>
                <h2 className="text-xl font-semibold mb-6">Appearance</h2>
                 <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <p>Dark Mode</p>
                        <ToggleSwitch enabled={themeMode === 'dark'} onChange={() => toggleThemeMode()} />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-2">Theme Color</h3>
                        <div className="flex items-center gap-4">
                            <button onClick={() => setColorTheme('blue')} className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center ring-2 ring-offset-2 dark:ring-offset-slate-800 ring-transparent data-[active=true]:ring-blue-500" data-active={colorTheme === 'blue'}>
                               {colorTheme === 'blue' && <CheckIcon className="h-6 w-6 text-white" />}
                            </button>
                             <button onClick={() => setColorTheme('teal')} className="h-12 w-12 rounded-full bg-gradient-to-r from-teal-600 to-green-600 flex items-center justify-center ring-2 ring-offset-2 dark:ring-offset-slate-800 ring-transparent data-[active=true]:ring-teal-500" data-active={colorTheme === 'teal'}>
                                {colorTheme === 'teal' && <CheckIcon className="h-6 w-6 text-white" />}
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        )}
    </div>
  );
};

// Add a helper CSS class for consistent input styling
const InputStyleInjector = () => (
    <style>{`
        .input-style {
            display: block;
            width: 100%;
            padding: 0.75rem 1rem;
            background-color: #F9FAFB;
            border: 1px solid #D1D5DB;
            border-radius: 0.5rem;
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        }
        .dark .input-style {
            background-color: #334155; /* slate-700 */
            border-color: #475569; /* slate-600 */
        }
        .input-style:focus {
            outline: 2px solid transparent;
            outline-offset: 2px;
            border-color: rgb(var(--color-primary-500));
            box-shadow: 0 0 0 2px rgb(var(--color-primary-500) / 0.5);
        }
    `}</style>
)
// Wrap the export to include the style injector
export default () => <><InputStyleInjector /><Settings /></>;