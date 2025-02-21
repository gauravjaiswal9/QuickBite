// src/components/Auth/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register', formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      navigate(data.user.role == 'owner' ? '/owner/dashboard' : '/customer/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 via-purple-600 to-pink-500 p-6">
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-12 rounded-3xl shadow-2xl w-full max-w-md border border-gray-500 transform transition-all hover:scale-105 hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-white mb-6">Register</h2>
        {error && <p className="text-red-400 text-center mt-2">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full p-4 border border-gray-600 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full p-4 border border-gray-600 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="w-full p-4 border border-gray-600 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full p-4 border border-gray-600 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          >
            <option value="customer">Customer</option>
            <option value="owner">Restaurant Owner</option>
          </select>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-2xl"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-white text-center">
          Already have an account?
          <a href='/login' className="text-purple-400 hover:underline ml-1">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
