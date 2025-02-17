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
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <header className="p-4 bg-black bg-opacity-50 flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Orders</h2>
        <nav>
          <Link to="/customer/dashboard" className="mr-4 hover:text-yellow-400 transition">Order Food</Link>
          <Link to="/customer/orders" className="mr-4 hover:text-yellow-400 transition">My Orders</Link>
          <button onClick={logout} className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded transition">Logout</button>
        </nav>
      </header>
      <main className="p-6">
        {orders.length === 0 ? (
          <p className="text-gray-200">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map(order => (
              <div key={order._id} className="bg-white text-black rounded-lg shadow-md p-4 hover:shadow-lg transition transform hover:scale-105">
                <p className="text-lg font-bold">Order ID: {order._id}</p>
                <p className="text-sm text-gray-700">Status: <span className="font-semibold text-green-500">{order.status}</span></p>
                <ul className="mt-2 space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-sm">{item.food.name || 'Item'} - Quantity: {item.quantity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CustomerOrders;
