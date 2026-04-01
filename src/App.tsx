import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Insights from './components/Insights';
import AddTransactionModal from './components/AddTransactionModal';
import { useStore } from './store';

const App: React.FC = () => {
  const { role } = useStore();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'insights'>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-2 px-4 ${activeTab === 'dashboard' ? 'border-b-2 border-blue-600' : ''}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-2 px-4 ${activeTab === 'transactions' ? 'border-b-2 border-blue-600' : ''}`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`py-2 px-4 ${activeTab === 'insights' ? 'border-b-2 border-blue-600' : ''}`}
            >
              Insights
            </button>
            {role === 'admin' && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="py-2 px-4 bg-green-600 text-white rounded ml-auto"
              >
                Add Transaction
              </button>
            )}
          </div>
        </div>
      </nav>
      <main>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'transactions' && <Transactions />}
        {activeTab === 'insights' && <Insights />}
      </main>
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;