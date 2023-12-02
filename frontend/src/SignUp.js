// src/SignUp.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function SignUp() {
  const history = useHistory();
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    password: '',
  });

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      console.log(data);
      history.push('/login');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label>
          Name:
          <input type="text" name="name" value={signupData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={signupData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Address:
          <input type="text" name="address" value={signupData.address} onChange={handleChange} />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={signupData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={signupData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}

export default SignUp;
