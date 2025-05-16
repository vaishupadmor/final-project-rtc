import axios from "axios";

const getCurrentUser = () => {
  const user = localStorage.getItem("e-commerce-user-details");
  return user ? JSON.parse(user) : null;
};

const getJwtToken = () => {
  const token = localStorage.getItem("e-commerce-user-token");
  return token ? `Bearer ${token}` : null;
};

const logout = () => {
  localStorage.clear();
  setTimeout(() => {
    window.location.href = "/login";
  }, 2000);
};

const getReadableTimestamp = (date) => {
  const dateObj = new Date(date);
  const datePart = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
  const timePart = `${dateObj.getHours()}:${dateObj.getMinutes()}`;
  const amOrPm = dateObj.getHours() >= 12 ? "PM" : "AM";
  return `${datePart} ${timePart} ${amOrPm}`;
};

const shortText = (text, maxLength = 50) => {
  if (!text) return " ";
  return text.length <= maxLength ? text : `${text.substring(0, maxLength - 3)}...`;
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// ✅ Automatically attach JWT token to all requests
api.interceptors.request.use((config) => {
  const token = getJwtToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export {
  getCurrentUser,
  getJwtToken,
  getReadableTimestamp,
  logout,
  shortText,
  api,
};
