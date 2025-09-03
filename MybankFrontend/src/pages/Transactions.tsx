import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import { dummyTransactions } from '../data/dummy';
import { Transaction, TransactionType, TransactionStatus } from '../types';
import Button from '../components/ui/Button';

const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
        case TransactionStatus.COMPLETED:
            return 'bg-success/10 text-success';
        case TransactionStatus.PENDING:
            return 'bg-warning/10 text-warning';
        case TransactionStatus.FAILED:
            return 'bg-danger/10 text-danger';
    }
}

const Transactions: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 10;

    const filteredTransactions = useMemo(() => {
        return dummyTransactions
            .filter(tx => tx.description.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(tx => filterType === 'all' || tx.type.toLowerCase() === filterType);
    }, [searchTerm, filterType]);

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
    const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

    const paginate = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    };

    return (
        <Card>
            <div className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold w-full sm:w-auto">Transaction History</h2>
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Search description..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="w-full sm:w-64 px-4 py-2 border rounded-lg bg-gray-50 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <select
                            value={filterType}
                            onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
                            className="w-full sm:w-auto px-4 py-2 border rounded-lg bg-gray-50 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            <option value="all">All Types</option>
                            <option value="credit">Credit</option>
                            <option value="debit">Debit</option>
                        </select>
                         <Button variant="secondary" className="w-full sm:w-auto">Export</Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                        <thead className="bg-gray-50 dark:bg-slate-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                            {currentTransactions.map((tx: Transaction) => (
                                <tr key={tx.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{tx.description}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{tx.category}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{tx.date}</td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${tx.type === TransactionType.CREDIT ? 'text-success' : 'text-danger'}`}>
                                        {tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{tx.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(tx.status)}`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Showing {indexOfFirstTransaction + 1} to {Math.min(indexOfLastTransaction, filteredTransactions.length)} of {filteredTransactions.length} results
                    </p>
                    <div className="flex items-center space-x-1">
                        <Button variant="secondary" size="sm" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </Button>
                        {[...Array(totalPages).keys()].map(num => (
                             <button key={num + 1} onClick={() => paginate(num + 1)} className={`px-3 py-1 text-sm rounded-md ${currentPage === num + 1 ? 'bg-primary text-white' : 'hover:bg-gray-200 dark:hover:bg-slate-700'}`}>
                                {num + 1}
                             </button>
                        ))}
                        <Button variant="secondary" size="sm" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                            Next
                        </Button>
                    </div>
                </div>

            </div>
        </Card>
    );
};

export default Transactions;