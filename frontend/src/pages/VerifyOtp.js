import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyOtp = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/verify-otp', {
                email,
                otp,
            });
            navigate('/thankyou', { state: { user: res.data.user } });
        } catch (error) {
            alert(error.response?.data?.message || 'OTP verification failed');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2>Verify OTP</h2>
            <form onSubmit={handleVerify}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <button type="submit">Verify OTP</button>
            </form>
        </div>
    );
};

export default VerifyOtp;
