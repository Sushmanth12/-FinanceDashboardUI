export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  description?: string;
}

export type Role = 'viewer' | 'admin';

export interface AppState {
  transactions: Transaction[];
  role: Role;
  filters: {
    category?: string;
    type?: 'income' | 'expense';
    search?: string;
  };
  setTransactions: (transactions: Transaction[]) => void;
  setRole: (role: Role) => void;
  setFilters: (filters: Partial<AppState['filters']>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}