import React, { useState, useEffect } from 'react';
import Input from '../components/Input.js';
import Button from '../components/Button.js';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { api, getCurrentUser } from '../utils/common';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const processLogin = async () => {
    toast.loading('Please wait...');
    try {
      const response = await api.post('/login', loginData);
      localStorage.setItem('e-commerce-user-token', response.data.token);
      localStorage.setItem('e-commerce-user-details', JSON.stringify(response.data.data));
      toast.dismiss();
      toast.success(response.data.message);
      setLoginData({ email: '', password: '' });
      setTimeout(() => window.location.href = '/dashboard', 2000);
    } catch (err) {
      toast.dismiss();
      const msg = err?.response?.data?.message || 'Login failed';
      setError(msg);
      toast.error(msg);
    }
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      toast.success('Already logged in. Redirecting...');
      setTimeout(() => window.location.href = '/dashboard', 3000);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 text-gray-800 font-outfit flex flex-col">
     

      <div className="flex-grow flex flex-col items-center justify-center px-5 py-10 mb-16">
        <h1 className="text-4xl font-extrabold text-center text-pink-500 mb-6 drop-shadow">
          🔒 Log in to BLACKPINK Shop
        </h1>

        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl hover:shadow-pink-300 p-10 transition-all duration-300 border border-pink-200">
          <Input
            label="Email"
            val={loginData.email}
            onChange={val => {
              setLoginData(prev => ({ ...prev, email: val }));
              setError('');
            }}
          />

          <Input
            label="Password"
            type="password"
            val={loginData.password}
            onChange={val => {
              setLoginData(prev => ({ ...prev, password: val }));
              setError('');
            }}
          />

          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

          <p className="mt-4 text-sm text-gray-600 text-center">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-pink-500 font-semibold hover:underline">
              Sign up
            </Link>
          </p>

          <div className="flex justify-between mt-6">
            <Button
              label="Cancel"
              variant="danger"
              onClick={() => (window.location.href = '/')}
            />
            <Button
              label="Login"
              variant="primary"
              onClick={processLogin}
            />
          </div>
        </div>
      </div>

      
      <Toaster position="bottom-center" />
    </div>
  );
}

export default Login;
