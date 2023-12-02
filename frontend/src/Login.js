// src/Login.js
// src/Login.js
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const history = useHistory(); // Get the history object

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        history.push('/profile');
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={loginData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
