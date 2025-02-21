import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OwnerDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <header className="p-6 bg-gray-700 bg-opacity-80 flex justify-between items-center shadow-lg">
        <h2 className="text-3xl font-extrabold">Owner Dashboard</h2>
        <nav className="space-x-4">
          <Link to="/owner/add-food" className="hover:text-yellow-400 transition font-semibold">Add Food</Link>
          <Link to="/owner/orders" className="hover:text-yellow-400 transition font-semibold">Orders</Link>
          <button onClick={logout} className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded transition shadow-md">Logout</button>
        </nav>
      </header>
      <main className="p-8 text-center">
        <h3 className="text-2xl font-semibold mb-4">Welcome, Owner!</h3>
        <p className="text-gray-300 text-lg">Use the navigation links above to manage food items and orders.</p>
      </main>
    </div>
  );
};

export default OwnerDashboard;