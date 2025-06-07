import axios from 'axios';

// const API_BASE = 'http://localhost:5000/api'; 
const API_BASE = 'https://nodejs-auth-assignment-1.onrender.com/api'

export const registerUser = async (formData) => {
    try {
        const res = await axios.post(`${API_BASE}/register`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    } catch (error) {
        throw error.response?.data || { message: 'Registration failed' };
    }
};

export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(`${API_BASE}/login`, credentials);
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const verifyOtp = async ({ email, otp }) => {
  try {
    const res = await axios.post(`${API_BASE}/verify-otp`, { email, otp });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'OTP verification failed' };
  }
};