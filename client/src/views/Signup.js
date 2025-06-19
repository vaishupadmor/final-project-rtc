import React, { useState } from 'react';
import Input from '../components/Input.js';
import Button from '../components/Button.js';
import toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';
import { api } from "../utils/common.js";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    rePassword: "",
  });

  const [error, setError] = useState("");

  const processSignup = async () => {
    toast.loading("Please wait...");
    try {
      const response = await api.post(`/signup`, signupData);
      toast.dismiss();
      toast.success(response.data.message);
      setSignupData({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        rePassword: "",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      toast.dismiss();
      const msg = err?.response?.data?.message || "Signup failed";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100 text-gray-800 font-outfit flex flex-col'>
      

      <div className='flex-grow flex flex-col items-center justify-center px-5 py-10'>
        <h1 className='text-4xl font-extrabold text-pink-500 mb-8 drop-shadow'>
          🎀 Create Your BLACKPINK Account
        </h1>

        <div className='w-full max-w-md bg-white rounded-3xl shadow-xl hover:shadow-pink-300 px-10 py-8 border border-pink-200 transition-all duration-300'>
          <Input
            label="Name"
            val={signupData.name}
            onChange={(val) => { setSignupData({ ...signupData, name: val }); setError(""); }}
          />

          <Input
            label="Email"
            val={signupData.email}
            onChange={(val) => { setSignupData({ ...signupData, email: val }); setError(""); }}
          />

          <Input
            label="Phone"
            val={signupData.phone}
            onChange={(val) => { setSignupData({ ...signupData, phone: val }); setError(""); }}
          />

          <Input
            label="Address"
            val={signupData.address}
            onChange={(val) => { setSignupData({ ...signupData, address: val }); setError(""); }}
          />

          <Input
            label="Password"
            type="password"
            val={signupData.password}
            onChange={(val) => { setSignupData({ ...signupData, password: val }); setError(""); }}
          />

          <Input
            label="Re-enter Password"
            type="password"
            val={signupData.rePassword}
            onChange={(val) => { setSignupData({ ...signupData, rePassword: val }); setError(""); }}
          />

          {error && <p className='text-red-500 text-sm mt-2 text-center'>{error}</p>}

          <p className='text-gray-600 mt-6 text-center'>
            Already have an account?{" "}
            <Link to="/login" className='text-pink-500 font-semibold hover:underline'>
              Login
            </Link>
          </p>

          <div className='flex justify-between mt-6'>
            <Button
              label="Cancel"
              onClick={() => { window.location.href = "/"; }}
              variant="danger"
            />
            <Button
              label="Signup"
              onClick={processSignup}
              variant="primary"
            />
          </div>
        </div>
      </div>

      
      <Toaster position="bottom-center" />
    </div>
  );
}

export default Signup;
