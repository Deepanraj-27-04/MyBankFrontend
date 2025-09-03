import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { dummyUsers } from '../../data/dummy';
import { User, KYCStatus } from '../../types';

const getStatusColor = (status: KYCStatus) => {
    switch (status) {
        case KYCStatus.VERIFIED:
            return 'bg-success/10 text-success';
        case KYCStatus.PENDING:
            return 'bg-warning/10 text-warning';
        case KYCStatus.REJECTED:
            return 'bg-danger/10 text-danger';
    }
}


const KYCVerification: React.FC = () => {
    const [users, setUsers] = useState<User[]>(dummyUsers);

    const handleUpdateStatus = (userId: string, newStatus: KYCStatus) => {
        setUsers(users.map(user => 
            user.id === userId ? { ...user, kycStatus: newStatus } : user
        ));
    };
    
    const pendingUsers = users.filter(u => u.kycStatus === KYCStatus.PENDING);

    return (
        <Card>
            <h2 className="text-2xl font-bold mb-6">KYC Verification Queue</h2>
            {pendingUsers.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                        <thead className="bg-gray-50 dark:bg-slate-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Submitted On</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Document</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                            {pendingUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt="" />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {user.submissionDate ? new Date(user.submissionDate).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <a href={user.kycDocumentUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                                           View Document
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <Button size="sm" onClick={() => handleUpdateStatus(user.id, KYCStatus.VERIFIED)}>Approve</Button>
                                        <Button size="sm" variant="danger" onClick={() => handleUpdateStatus(user.id, KYCStatus.REJECTED)}>Reject</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">No pending KYC submissions.</p>
            )}
        </Card>
    );
};

export default KYCVerification;