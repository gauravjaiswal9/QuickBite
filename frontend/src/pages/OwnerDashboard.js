// src/pages/OwnerDashboard.js
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
    <div>
      <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <h2>Owner Dashboard</h2>
        <nav>
          <Link to="/owner/add-food" style={{ marginRight: '1rem' }}>Add Food</Link>
          <Link to="/owner/orders" style={{ marginRight: '1rem' }}>Orders</Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
      <main style={{ padding: '1rem' }}>
        <h3>Welcome, Owner!</h3>
        <p>Use the navigation links above to manage food items and orders.</p>
      </main>
    </div>
  );
};

export default OwnerDashboard;
