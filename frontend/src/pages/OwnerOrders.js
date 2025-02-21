import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const OwnerOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();

    // Listen for order updates from the server
    socket.on("orderUpdated", (updatedOrder) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    return () => {
      socket.off("orderUpdated"); // Cleanup listener
    };
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await API.put(`/orders/${orderId}`, { status });
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 to-blue-600 text-white">
      <header className="p-4 bg-black bg-opacity-50 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Orders</h2>
        <nav>
          <Link to="/owner/dashboard" className="mr-4 hover:text-yellow-400 transition">
            Dashboard
          </Link>
          <Link to="/owner/add-food" className="mr-4 hover:text-yellow-400 transition">
            Add Food
          </Link>
          <button onClick={logout} className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded transition">
            Logout
          </button>
        </nav>
      </header>
      <main className="p-6">
        {orders.length === 0 ? (
          <p className="text-gray-200">No orders available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white text-black rounded-lg shadow-md p-4 hover:shadow-lg transition transform hover:scale-105">
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                  <strong>Customer:</strong> {order.customer?.name || "Unknown"}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <select
                  className="mt-2 p-2 border rounded"
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                >
                  <option value="placed">Placed</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="delivered">Delivered</option>
                </select>
                <ul className="mt-2 space-y-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="bg-gray-200 p-2 rounded-lg">
                      {item.food?.name || "Item"} - Quantity: {item.quantity}
                    </li>
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

export default OwnerOrders;
