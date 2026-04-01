import React, { useMemo } from 'react';
import { useStore } from '../store';

const Insights: React.FC = () => {
  const { transactions } = useStore();

  const insights = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');

    // Highest spending category
    const categorySpending = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);
    const highestCategory = Object.entries(categorySpending).reduce((a, b) => a[1] > b[1] ? a : b, ['', 0]);

    // Monthly comparison (assuming current month and previous)
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthExpenses = expenses
      .filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const prevMonthExpenses = expenses
      .filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === prevMonth && d.getFullYear() === prevYear;
      })
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const monthlyChange = prevMonthExpenses === 0 ? 0 : ((currentMonthExpenses - prevMonthExpenses) / prevMonthExpenses) * 100;

    // Average transaction
    const avgTransaction = transactions.length > 0 ? transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) / transactions.length : 0;

    return {
      highestCategory: highestCategory[0],
      highestAmount: highestCategory[1],
      currentMonthExpenses,
      prevMonthExpenses,
      monthlyChange,
      avgTransaction,
      totalTransactions: transactions.length,
    };
  }, [transactions]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Highest Spending Category</h3>
          <p className="text-xl">{insights.highestCategory || 'N/A'}</p>
          <p className="text-sm text-gray-600">${insights.highestAmount.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Monthly Expense Comparison</h3>
          <p className="text-xl">This Month: ${insights.currentMonthExpenses.toFixed(2)}</p>
          <p className="text-xl">Last Month: ${insights.prevMonthExpenses.toFixed(2)}</p>
          <p className={`text-sm ${insights.monthlyChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
            {insights.monthlyChange >= 0 ? '+' : ''}{insights.monthlyChange.toFixed(2)}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Average Transaction</h3>
          <p className="text-xl">${insights.avgTransaction.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Total Transactions</h3>
          <p className="text-xl">{insights.totalTransactions}</p>
        </div>
      </div>
    </div>
  );
};

export default Insights;