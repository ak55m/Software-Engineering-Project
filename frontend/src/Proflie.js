// src/Profile.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    password: '',
  });

  const history = useHistory();

  // Fetch user data from the server when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get-user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send the user's token for authentication
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
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

  const handleEdit = () => {
    // Implement logic to navigate to an edit profile page or modal
    // You can use the history.push method here
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Address: {userData.address}</p>
      <p>Phone Number: {userData.phoneNumber}</p>
      <p>Password: ********</p>

      <button onClick={handleEdit}>Edit Profile</button>
    </div>
  );
}

export default Profile;
