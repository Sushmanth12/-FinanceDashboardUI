import React, { useState, useMemo } from 'react';
import { useStore } from '../store';
import { Transaction } from '../types';

const Transactions: React.FC = () => {
  const { transactions, role, filters, setFilters, deleteTransaction } = useStore();
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'category'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => {
        if (filters.category && t.category !== filters.category) return false;
        if (filters.type && t.type !== filters.type) return false;
        if (filters.search && !t.description?.toLowerCase().includes(filters.search.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        let aVal: any, bVal: any;
        if (sortBy === 'date') {
          aVal = new Date(a.date);
          bVal = new Date(b.date);
        } else if (sortBy === 'amount') {
          aVal = a.amount;
          bVal = b.amount;
        } else {
          aVal = a.category;
          bVal = b.category;
        }
        if (sortOrder === 'asc') return aVal > bVal ? 1 : -1;
        return aVal < bVal ? 1 : -1;
      });
  }, [transactions, filters, sortBy, sortOrder]);

  const handleSort = (field: 'date' | 'amount' | 'category') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const categories = [...new Set(transactions.map(t => t.category))];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Transactions</h2>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-4">
        <select
          value={filters.category || ''}
          onChange={(e) => setFilters({ category: e.target.value || undefined })}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select
          value={filters.type || ''}
          onChange={(e) => setFilters({ type: e.target.value as 'income' | 'expense' || undefined })}
          className="border p-2 rounded"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          placeholder="Search description..."
          value={filters.search || ''}
          onChange={(e) => setFilters({ search: e.target.value || undefined })}
          className="border p-2 rounded"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 cursor-pointer" onClick={() => handleSort('date')}>Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th className="p-3">Description</th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('category')}>Category {sortBy === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              <th className="p-3">Type</th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort('amount')}>Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
              {role === 'admin' && <th className="p-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(t => (
              <tr key={t.id} className="border-t">
                <td className="p-3">{t.date}</td>
                <td className="p-3">{t.description}</td>
                <td className="p-3">{t.category}</td>
                <td className="p-3">{t.type}</td>
                <td className="p-3" style={{ color: t.amount >= 0 ? 'green' : 'red' }}>
                  ${Math.abs(t.amount).toFixed(2)}
                </td>
                {role === 'admin' && (
                  <td className="p-3">
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTransactions.length === 0 && (
        <p className="text-center mt-4">No transactions found.</p>
      )}
    </div>
  );
};

export default Transactions;