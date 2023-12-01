import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import axios from 'axios';

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/login', {
        userId,
        password
      });

      if (response.data === 'verified') {
        // Redirect to homepage upon successful verification
       // history.push('/Homepage'); // Replace '/homepage' with your homepage route
        navigate('/Homepage'); 
       alert("verified")





       
      } else {
        // Display error message on login failure
        setErrorMessage('Invalid credentials. Please try again and again.');
        console.log(errorMessage);
        alert("not verified")
      }
    } catch (error) {
     // console.error('Error:', error);
    }
  };

  return (
    <div>
      {/* Your login form */}
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>

      {/* Display error message if login fails */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default Login;
