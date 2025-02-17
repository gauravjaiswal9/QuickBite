// src/pages/OwnerOrders.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

const OwnerOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await API.get('/orders');
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await API.put(`/orders/${orderId}`, { status });
      setOrders(orders.map(order => order._id === orderId ? { ...order, status } : order));
    } catch (err) {
      console.error(err);
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
        <h2>Manage Orders</h2>
        <nav>
          <Link to="/owner/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>
          <Link to="/owner/add-food" style={{ marginRight: '1rem' }}>Add Food</Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
      <main style={{ padding: '1rem' }}>
        {orders.length === 0 ? (
          <p>No orders available.</p>
        ) : (
          orders.map(order => (
            <div key={order._id} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Customer:</strong> {order.customer.name}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)}>
                <option value="placed">Placed</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="delivered">Delivered</option>
              </select>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.food.name || 'Item'} - Quantity: {item.quantity}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default OwnerOrders;
