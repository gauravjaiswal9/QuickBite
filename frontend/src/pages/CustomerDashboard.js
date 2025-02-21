import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const CustomerDashboard = () => {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await API.get('/foods');
        setFoods(res.data);
      } catch (err) {
        console.error(err);
        setMessage('Error fetching food items.');
      }
    };

    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders/my-orders');
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFoods();
    fetchOrders();

    // Listen for real-time order status updates
    socket.on('orderUpdated', (updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    return () => {
      socket.off('orderUpdated');
    };
  }, []);

  const addToCart = (food) => {
    const exists = cart.find((item) => item.food === food._id);
    if (exists) {
      setCart(cart.map((item) => (item.food === food._id ? { ...item, quantity: item.quantity + 1 } : item)));
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
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <header className="p-4 bg-black bg-opacity-50 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Dashboard</h2>
        <nav>
          <Link to="/customer/dashboard" className="mr-4 hover:text-yellow-400 transition">
            Order Food
          </Link>
          <Link to="/customer/orders" className="mr-4 hover:text-yellow-400 transition">
            My Orders
          </Link>
          <button onClick={logout} className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded transition">
            Logout
          </button>
        </nav>
      </header>

      <main className="p-6">
        <h3 className="text-xl font-semibold mb-4">Available Food Items</h3>
        {foods.length === 0 ? (
          <p className="text-gray-200">No food items available.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {foods.map((food) => (
              <div key={food._id} className="bg-white text-black rounded-lg shadow-md p-3 hover:shadow-lg transition transform hover:scale-105 flex flex-col items-center">
                <h4 className="text-md font-bold text-center">{food.name}</h4>
                <p className="text-sm text-gray-700 text-center">{food.description}</p>
                <p className="text-green-500 font-semibold text-center">₹{food.price}</p>
                <button onClick={() => addToCart(food)} className="mt-2 bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded text-white transition">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-6 p-4 bg-black bg-opacity-50 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Your Order</h3>
            <ul className="mt-2 space-y-2">
              {cart.map((item, index) => (
                <li key={index} className="bg-gray-700 p-2 rounded-lg">
                  {item.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
            <button onClick={placeOrder} className="mt-4 bg-green-500 hover:bg-green-700 px-4 py-2 rounded transition">
              Place Order
            </button>
          </div>
        )}

     

        {message && <p className="mt-4 text-yellow-300">{message}</p>}
      </main>
    </div>
  );
};

export default CustomerDashboard;
