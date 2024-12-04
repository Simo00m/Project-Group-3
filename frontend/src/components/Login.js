import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate after login
import { login } from '../services/api'; // Import the login function from services/api
import './Login.css'; // Import the Login CSS styles

const Login = ({ setIsAuthenticated }) => { // Accept setIsAuthenticated as a prop
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState(''); // State for error message
  const navigate = useNavigate(); // Hook to programmatically navigate to other pages

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Call the login function from services/api with username and password
      const response = await login({ username, password });
      if (response.token) {
        // If a token is returned, set user as authenticated
        setIsAuthenticated(true);
        // Store the token if needed (e.g., in localStorage or context)
        localStorage.setItem('authToken', response.token);
        // Redirect to the admin dashboard
        navigate('/admin-dashboard');
      } else {
        // If no token is returned, show an error message
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Invalid username or password'); // Show error message on failure
    }
  };

  return (
    <div className="login-wrapper">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="login-container">
        <h2>Login</h2>

        {/* Profile Display Section */}
        <div className="profile-display">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Profile"
            className="profile-image"
          />
        </div>

        <p>Welcome! Please enter your credentials below.</p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Email</label>
            <i className="fa-solid fa-envelope"></i>
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
            <i className="fa-solid fa-lock"></i>
          </div>
          <p><input type="checkbox" /> Remember me</p>
          <button type="submit">Login</button>
        </form>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        
      </div>
    </div>
  );
};

export default Login;
