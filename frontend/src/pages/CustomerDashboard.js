// src/pages/CustomerDashboard.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import FoodItemCard from '../components/FoodItemCard';

const CustomerDashboard = () => {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchFoods = async () => {
    try {
      const res = await API.get('/foods');
      setFoods(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Error fetching food items.');
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const addToCart = (food) => {
    const exists = cart.find(item => item.food === food._id);
    if (exists) {
      setCart(cart.map(item => item.food === food._id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { food: food._id, name: food.name, quantity: 1 }]);
    }
  };

  const placeOrder = async () => {
    try {
      const orderPayload = { items: cart };
      await API.post('/orders', orderPayload);
      setMessage('Order placed successfully!');
      setCart([]);
    } catch (err) {
      console.error(err);
      setMessage('Error placing order.');
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
        <h2>Customer Dashboard</h2>
        <nav>
          <Link to="/customer/dashboard" style={{ marginRight: '1rem' }}>Order Food</Link>
          <Link to="/customer/orders" style={{ marginRight: '1rem' }}>My Orders</Link>
          <button onClick={logout}>Logout</button>
        </nav>
      </header>
      <main style={{ padding: '1rem' }}>
        <h3>Available Food Items</h3>
        {foods.length === 0 ? (
          <p>No food items available.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {foods.map(food => (
              <FoodItemCard key={food._id} food={food} onOrder={addToCart} />
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <div style={{ marginTop: '1rem', border: '1px solid #000', padding: '1rem' }}>
            <h3>Your Order</h3>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>{item.name} - Quantity: {item.quantity}</li>
              ))}
            </ul>
            <button onClick={placeOrder}>Place Order</button>
          </div>
        )}
        {message && <p>{message}</p>}
      </main>
    </div>
  );
};

export default CustomerDashboard;
