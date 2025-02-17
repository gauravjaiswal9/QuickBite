// src/pages/CustomerOrders.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await API.get('/orders/myorders');
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); // auto-refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div>
      <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <h2>My Orders</h2>
        <nav>
          <Link to="/customer/dashboard" style={{ marginRight: '1rem' }}>Order Food</Link>
          <Link to="/customer/orders" style={{ marginRight: '1rem' }}>My Orders</Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
      <main style={{ padding: '1rem' }}>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map(order => (
            <div key={order._id} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.food.name || 'Item'} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default CustomerOrders;
