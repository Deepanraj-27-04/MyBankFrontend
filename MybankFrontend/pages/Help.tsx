import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

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

const AdminSettings: React.FC = () => {
    const { user } = useAuth();
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    if (!user) return null;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Admin Settings</h1>
            
            <Card>
                <h2 className="text-xl font-semibold mb-6">Admin Profile</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <input type="text" defaultValue={user.name} className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <input type="email" defaultValue={user.email} className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg" />
                    </div>
                    <div className="md:col-span-2 text-right">
                        <Button type="submit">Save Profile</Button>
                    </div>
                </form>
            </Card>

            <Card>
                <h2 className="text-xl font-semibold mb-6">System Preferences</h2>
                <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                        <div>
                            <h3 className="font-medium">Maintenance Mode</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Temporarily disable customer access for system updates.</p>
                        </div>
                        <ToggleSwitch enabled={maintenanceMode} onChange={setMaintenanceMode} />
                    </div>
                     <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                        <h3 className="font-medium">System Logs</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">View recent system activity and error logs.</p>
                        <Button variant="secondary">View Logs</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AdminSettings;