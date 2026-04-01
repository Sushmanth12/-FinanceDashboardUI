import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction, AppState } from './types';

const mockTransactions: Transaction[] = [
  { id: '1', date: '2023-01-01', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: '2', date: '2023-01-02', amount: -200, category: 'Food', type: 'expense', description: 'Groceries' },
  { id: '3', date: '2023-01-03', amount: -100, category: 'Transport', type: 'expense', description: 'Bus fare' },
  { id: '4', date: '2023-01-04', amount: 1000, category: 'Freelance', type: 'income', description: 'Project payment' },
  { id: '5', date: '2023-01-05', amount: -300, category: 'Entertainment', type: 'expense', description: 'Movie tickets' },
  { id: '6', date: '2023-01-06', amount: -150, category: 'Utilities', type: 'expense', description: 'Electricity bill' },
  { id: '7', date: '2023-01-07', amount: 200, category: 'Investment', type: 'income', description: 'Dividend' },
  { id: '8', date: '2023-01-08', amount: -50, category: 'Food', type: 'expense', description: 'Coffee' },
  { id: '9', date: '2023-01-09', amount: -400, category: 'Shopping', type: 'expense', description: 'Clothes' },
  { id: '10', date: '2023-01-10', amount: 3000, category: 'Bonus', type: 'income', description: 'Year-end bonus' },
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      role: 'viewer',
      filters: {},
      setTransactions: (transactions) => set({ transactions }),
      setRole: (role) => set({ role }),
      setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
      addTransaction: (transaction) => {
        const newTransaction = { ...transaction, id: Date.now().toString() };
        set((state) => ({ transactions: [...state.transactions, newTransaction] }));
      },
      editTransaction: (id, updatedTransaction) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updatedTransaction } : t
          ),
        }));
      },
      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },
    }),
    {
      name: 'finance-dashboard',
    }
  )
);