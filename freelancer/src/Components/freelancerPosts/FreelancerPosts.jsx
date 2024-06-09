import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCardFreelancer from '../postCard/PostCardFreelancer';
import { Flex, Box, Input, Button, Heading, useToast, SimpleGrid } from '@chakra-ui/react';

export default function FreelancerPosts() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const toast = useToast();

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = () => {
    axios.get('http://localhost:3500/client/getAllPosts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    })
      .then(response => {
        console.log('Fetched all posts:', response.data); 
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        toast({
          title: "Error",
          description: "Failed to fetch posts.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery === '') {
      fetchAllPosts();
      return;
    }

    axios.get(`http://localhost:3500/client/search?requirements=${trimmedQuery}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    })
      .then(response => {
        console.log('Searched posts:', response.data); // Debugging line
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error searching posts:', error);
        toast({
          title: "Error",
          description: "Failed to search posts.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box px={4} py={6} mx="auto" maxW="1200px">
      <Heading as="h1" fontSize="3xl" fontWeight="bold" mb={6} textAlign="center">
        Freelancer Posts
      </Heading>
      <Flex mb={6} justifyContent="center" alignItems="center">
        <Input
          placeholder="Search by requirements..."
          size="lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mr={2}
          width={{ base: "100%", sm: "300px" }}
        />
        <Button size="lg" colorScheme="blue" onClick={handleSearch} mr={2}>
          Search
        </Button>
        <Button size="lg" colorScheme="gray" onClick={fetchAllPosts}>
          Reset
        </Button>
      </Flex>
      <SimpleGrid columns={{ base: 1, sm:  2, md: 3 }} spacing={10}>
      {posts
  .filter(post => post !== null)
  .map(post => (
    post && <PostCardFreelancer key={post._id} post={post} postId={post._id} />
  ))}
      </SimpleGrid>
    </Box>
  );
}
