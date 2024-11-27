import React from "react";
import { Link } from "react-router-dom"; // To navigate between pages
import "./style.css"; // Assuming the styles are shared

const Signup = () => {
  return (
    <>
      {/* Background Video */}
      <video src="/video.mp4" autoPlay loop muted></video>

      <div className="container">
        <div className="login-form">
          <h2>Sign Up</h2>
          <form action="" method="get">
            <div className="form-group">
              <input type="text" required />
              <label>Name</label>
              <i className="fa-solid fa-user"></i>
            </div>
            <div className="form-group">
              <input type="email" required />
              <label>Email</label>
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div className="form-group">
              <input type="password" required />
              <label>Password</label>
              <i className="fa-solid fa-lock"></i>
            </div>
            <div className="form-group">
              <input type="password" required />
              <label>Confirm Password</label>
              <i className="fa-solid fa-lock"></i>
            </div>
            <input type="button" id="btn" value="Sign Up" />
            <p>
              Already have an account? <Link to="/">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
