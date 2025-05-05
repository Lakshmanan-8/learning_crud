import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Fetch user information using the token
    if (token) {
      axios.get('http://localhost:4000/user/me', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      })
        .then(response => {
          setUser(response.data); // Set the user data
          setLoading(false);
        })
        .catch(err => {
          setError( 'Failed to fetch user data');
          setLoading(false);
        });
    } else {
      setError('No token found, please log in.');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const handlelogout = () =>{

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  
    navigate('/login');
  
  
  };

  return (
    <form>
    <div className="dashboard-container">
      <h2>Welcome to your Dashboard</h2>
      

      {/* Display user details */}
      <div className="user-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Age:</strong> {user.age}</p>
      </div>
      
      {/* You can add more features here, like updating profile or user stats */}
    </div>
    <button onClick={handlelogout}>Logout</button>
    </form>
  );  
  
};




export default Dashboard;
