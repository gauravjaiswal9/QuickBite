// src/pages/OwnerAddFood.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

const OwnerAddFood = () => {
  const [food, setFood] = useState({ name: '', description: '', price: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const addFood = async (e) => {
    e.preventDefault();
    // Convert price to a number
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
    <div>
      <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <h2>Add Food Item</h2>
        <nav>
          <Link to="/owner/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>
          <Link to="/owner/orders" style={{ marginRight: '1rem' }}>Orders</Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
      <main style={{ padding: '1rem' }}>
        <form onSubmit={addFood}>
          <input
            type="text"
            placeholder="Name"
            value={food.name}
            onChange={(e) => setFood({ ...food, name: e.target.value })}
            required
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Description"
            value={food.description}
            onChange={(e) => setFood({ ...food, description: e.target.value })}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          <input
            type="number"
            placeholder="Price"
            value={food.price}
            onChange={(e) => setFood({ ...food, price: e.target.value })}
            required
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          <button type="submit" style={{ width: '100%', padding: '0.5rem' }}>Add Food</button>
        </form>
        {message && <p>{message}</p>}
      </main>
    </div>
  );
};

export default OwnerAddFood;
