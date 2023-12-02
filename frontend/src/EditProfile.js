// src/EditProfile.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function EditProfile() {
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    password: '',
  });
  const [feedback, setFeedback] = useState({});

  const history = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get-user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setEditData(data.user);
        } else {
          console.error('Error fetching user data:', response.statusText);
          // Handle unauthorized access or other errors
          history.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [history]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/edit-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        console.log('Profile updated successfully');
        setFeedback({ type: 'success', message: 'Profile updated successfully' });
        history.push('/profile');
      } else {
        const errorData = await response.json();
        console.error('Error updating profile:', errorData.message);
        setFeedback({ type: 'error', message: 'Error updating profile' });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setFeedback({ type: 'error', message: 'Error updating profile' });
    }
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };


  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleEditSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={editData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={editData.email}
          onChange={handleInputChange}
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={editData.address}
          onChange={handleInputChange}
        />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={editData.phoneNumber}
          onChange={handleInputChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={editData.password}
          onChange={handleInputChange}
        />

        <button type="submit">Save Changes</button>
      </form>
      {feedback.type === 'success' && <p style={{ color: 'green' }}>{feedback.message}</p>}
      {feedback.type === 'error' && <p style={{ color: 'red' }}>{feedback.message}</p>}
    </div>
  );
}

export default EditProfile;
