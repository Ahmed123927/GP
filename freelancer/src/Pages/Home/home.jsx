import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Featured from '../../Components/featured/Featured';
import PostList from '../../Components/postList/PostList';
import FeaturedFreelancer from '../../Components/featureFreelancer/FeatureFreelancer';
import Contact from '../../Components/contact/Contact';
import { Spinner, Flex } from '@chakra-ui/react';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3500/user/relatedPost', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
          }
        });
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <div>
      <div key="home">
        <Featured />
      </div>
      <div key="freelancer">
        <FeaturedFreelancer />
      </div>
      <div key="postList">
        <PostList posts={posts} />
      </div>
      <div key="contact">
        <Contact />
      </div>
    </div>
  );
};

export default Home;
