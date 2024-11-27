import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./style.css"; 

const Login = () => {
  return (
    <>
      {/* Background Video */}
      <video src="/video.mp4" autoPlay loop muted></video>


      <div className="container">
        <div className="login-form">
          <h2>Login</h2>
          <form action="" method="get">
            <div className="form-group">
              <input type="email" required />
              <label>Email</label>
              <i className="fa-solid fa-envelope"></i> {/* Font Awesome Icon */}
            </div>
            <div className="form-group">
              <input type="password" required />
              <label>Password</label>
              <i className="fa-solid fa-lock"></i> {/* Font Awesome Icon */}
            </div>
            <p>
              <input type="checkbox" /> Remember me
            </p>
            <input type="button" id="btn" value="Login" />
            <p>
              Don't have an account? <a href="#">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
