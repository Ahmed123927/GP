// FreelancerPosts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCardFreelancer from '../postCard/PostCardFreelancer';
import { Flex } from '@chakra-ui/react'; 

export default function FreelancerPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3500/client/getAllPosts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    })
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    
    
    <Flex flexWrap="wrap" justifyContent="center" alignItems="flex-start">
      {posts.map(post => {
        return (
          <PostCardFreelancer key={post._id} post={post} postId={post._id}/>
        );
      })}
    </Flex>
  );
}
