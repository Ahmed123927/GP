// ClientHome.js
import React, { useState, useEffect } from 'react';
import ClientFeatured from '../../Components/clientFeatured/ClientFeatured';
import ClientSection from '../../Components/clientSection/ClientSection';
import ClientPosts from '../../Components/clientPosts/ClientPosts';
import axios from 'axios'; // Import Axios or use fetch

export default function ClientHome() {
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [jwtToken, setJwtToken] = useState(null);
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    // Fetch user data
    axios.get('http://localhost:3500/client', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUserData(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    // Fetch user's own posts
    axios.get('http://localhost:3500/client/ownposts', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUserPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching user posts:', error);
      });
  }, [jwtToken]);

  useEffect(() => {
    // Load token from local storage
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setJwtToken(token);
    }
  }, []);

  return (
    <div>
      <ClientFeatured />
      <ClientSection />
      {userData && <ClientPosts user={userData} posts={userPosts} />}
    </div>
  );
}
