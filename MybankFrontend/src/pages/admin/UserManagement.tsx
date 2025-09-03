import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { dummyUsers } from '../../data/dummy';
import { User, KYCStatus } from '../../types';
import EditUserModal from '../../components/ui/EditUserModal';

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

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    handleCloseModal();
  };


  return (
    <>
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">User Management</h2>
          <Button className="w-full sm:w-auto">Add New User</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">KYC Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Registered On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Role</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              {users.map((user: User) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt={`${user.name}'s avatar`} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.kycStatus)}`}>
                      {user.kycStatus}
                    </span>
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.submissionDate ? new Date(user.submissionDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 capitalize">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="secondary" size="sm" onClick={() => handleEditClick(user)}>Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {selectedUser && (
        <EditUserModal
            isOpen={isEditModalOpen}
            onClose={handleCloseModal}
            user={selectedUser}
            onSave={handleSaveUser}
        />
      )}
    </>
  );
};

export default UserManagement;