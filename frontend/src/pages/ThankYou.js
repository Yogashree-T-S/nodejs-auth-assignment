import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ThankYou = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;

    if (!user) {
        navigate('/login');
        return null;
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete your account?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`https://nodejs-auth-assignment-3.onrender.com/api/delete-account/${user.email}`);
            alert('Your account has been deleted.');
            navigate('/');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Failed to delete account.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto', textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2>Welcome, {user.name}!</h2>
            <img
                src={`https://nodejs-auth-assignment-3.onrender.com/${user.image}`}
                alt="User"
                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Company:</strong> {user.company}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Date of Birth:</strong> {user.dob}</p>
            
            <button onClick={handleDelete} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '5px' }}>
                Delete My Account
            </button>
        </div>
    );
};

export default ThankYou;
