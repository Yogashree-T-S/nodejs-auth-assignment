import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Login Failed.Sorry, we can't log you in</h1>
      <p>Incorrect email or password. Please try again.</p>
      <button
        onClick={() => navigate('/')}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        Back to Login
      </button>
    </div>
  );
};

export default Error;
