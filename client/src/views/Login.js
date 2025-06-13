import React, { useState, useEffect } from 'react';
import Input from '../components/Input.js';
import Button from '../components/Button.js';
import toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';
import { api, getCurrentUser } from "../utils/common";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const processLogin = async () => {
    toast.loading("Please wait...");
    try {
      const response = await api.post(`/login`, loginData);
      localStorage.setItem("e-commerce-user-token", response.data.token);
      localStorage.setItem("e-commerce-user-details", JSON.stringify(response.data.data));
      toast.dismiss();
      toast.success(response.data.message);
      setLoginData({ email: "", password: "" });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (err) {
      toast.dismiss();
      setError(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      toast.success("You are already logged in. Redirecting to dashboard...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center px-5 py-10">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Login</h1>

        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg hover:shadow-xl px-10 py-8 transition-all duration-300">
          <Input
            label={"Email"}
            val={loginData.email}
            onChange={(val) => {
              setLoginData({ ...loginData, email: val });
              setError("");
            }}
          />

          <Input
            label={"Password"}
            val={loginData.password}
            type="password"
            onChange={(val) => {
              setLoginData({ ...loginData, password: val });
              setError("");
            }}
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
          </p>

          <div className="flex justify-between mt-6">
            <Button
              label="Cancel"
              onClick={() => {
                window.location.href = "/";
              }}
              variant="danger"
            />
            <Button
              label="Login"
              onClick={processLogin}
              variant="primary"
            />
          </div>
        </div>
      </div>

      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default Login;
