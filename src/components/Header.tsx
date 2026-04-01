import React from 'react';
import { useStore } from '../store';
import { Role } from '../types';

const Header: React.FC = () => {
  const { role, setRole } = useStore();

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Finance Dashboard</h1>
        <div className="flex items-center space-x-2">
          <label htmlFor="role-select" className="text-sm">Role:</label>
          <select
            id="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="bg-white text-black px-2 py-1 rounded"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;