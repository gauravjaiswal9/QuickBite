import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

const OwnerAddFood = () => {
  const [food, setFood] = useState({ name: '', description: '', price: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const addFood = async (e) => {
    e.preventDefault();
    const payload = { ...food, price: parseFloat(food.price) };
    try {
      await API.post('/foods', payload);
      setMessage('Food added successfully.');
      setFood({ name: '', description: '', price: '' });
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Error adding food item.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <header className="p-6 bg-gray-700 bg-opacity-80 flex justify-between items-center shadow-lg">
        <h2 className="text-3xl font-extrabold">Add Food Item</h2>
        <nav className="space-x-4">
          <Link to="/owner/dashboard" className="hover:text-yellow-400 transition font-semibold">Dashboard</Link>
          <Link to="/owner/orders" className="hover:text-yellow-400 transition font-semibold">Orders</Link>
          <button onClick={logout} className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded transition shadow-md">Logout</button>
        </nav>
      </header>
      <main className="p-8 text-center">
        <form onSubmit={addFood} className="bg-gray-700 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Name"
            value={food.name}
            onChange={(e) => setFood({ ...food, name: e.target.value })}
            required
            className="w-full p-2 mb-4 rounded bg-gray-800 text-white border border-gray-600"
          />
          <input
            type="text"
            placeholder="Description"
            value={food.description}
            onChange={(e) => setFood({ ...food, description: e.target.value })}
            className="w-full p-2 mb-4 rounded bg-gray-800 text-white border border-gray-600"
          />
          <input
            type="number"
            placeholder="Price"
            value={food.price}
            onChange={(e) => setFood({ ...food, price: e.target.value })}
            required
            className="w-full p-2 mb-4 rounded bg-gray-800 text-white border border-gray-600"
          />
          <button type="submit" className="w-full p-2 bg-green-500 hover:bg-green-700 rounded transition">Add Food</button>
        </form>
        {message && <p className="mt-4 text-yellow-300">{message}</p>}
      </main>
    </div>
  );
};

export default OwnerAddFood;