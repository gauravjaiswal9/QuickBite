// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CustomerDashboard from './pages/CustomerDashboard';
import CustomerOrders from './pages/CustomerOrders';
import OwnerDashboard from './pages/OwnerDashboard';
import OwnerAddFood from './pages/OwnerAddFood';
import OwnerOrders from './pages/OwnerOrders';

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Routes>
      <Route
        path="/"
        element={
          token 
            ? (role === 'owner' ? <Navigate to="/owner/dashboard" /> : <Navigate to="/customer/dashboard" />)
            : <Navigate to="/login" />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Customer Routes */}
      <Route
        path="/customer/dashboard"
        element={token && role === 'customer' ? <CustomerDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/customer/orders"
        element={token && role === 'customer' ? <CustomerOrders /> : <Navigate to="/login" />}
      />

      {/* Owner Routes */}
      <Route
        path="/owner/dashboard"
        element={token && role === 'owner' ? <OwnerDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/owner/add-food"
        element={token && role === 'owner' ? <OwnerAddFood /> : <Navigate to="/login" />}
      />
      <Route
        path="/owner/orders"
        element={token && role === 'owner' ? <OwnerOrders /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
