import React, { useEffect, useState } from 'react';
import Featured from '../../Components/featured/Featured';
import PostList from '../../Components/postList/PostList';
import FeaturedFreelancer from '../../Components/featureFreelancer/FeatureFreelancer';
import Contact from '../../Components/contact/Contact';
import { Spinner, Flex } from '@chakra-ui/react';

const home = () => {
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const posts = [
    {
      id: 1,
      author: 'Ahmed Hussein',
      authorRole: 'web company',
      authorAvatar: 'https://bit.ly/sage-adebayo',
      content: 'test post',
      imageUrl: '/img/man.png',
      imageAlt: 'Chakra UI',
    },
    {
      id: 1,
      author: 'Ahmed mahmoud',
      authorRole: 'Creator, Chakra UI',
      authorAvatar: 'https://bit.ly/sage-adebayo',
      content: 'With Chakra UI, I wanted to sync...',
      imageUrl: '/img/man.png',
      imageAlt: 'Chakra UI',
    },

    {
      id: 2,
      author: 'Segun Adebayo',
      authorRole: 'Creator, Chakra UI',
      authorAvatar: 'https://bit.ly/sage-adebayo',
      content: 'With Chakra UI, I wanted to sync...',
      imageUrl: '/img/man.png',
      imageAlt: 'Chakra UI',
    },
    {
      id: 2,
      author: 'Segun Adebayo',
      authorRole: 'Creator, Chakra UI',
      authorAvatar: 'https://bit.ly/sage-adebayo',
      content: 'With Chakra UI, I wanted to sync...',
      imageUrl: '/img/man.png',
      imageAlt: 'Chakra UI',
    },
    {
      id: 2,
      author: 'Segun Adebayo',
      authorRole: 'Creator, Chakra UI',
      authorAvatar: 'https://bit.ly/sage-adebayo',
      content: 'With Chakra UI, I wanted to sync...',
      imageUrl: '/img/man.png',
      imageAlt: 'Chakra UI',
    },
    {
      id: 2,
      author: 'Segun Adebayo',
      authorRole: 'Creator, Chakra UI',
      authorAvatar: 'https://bit.ly/sage-adebayo',
      content: 'With Chakra UI, I wanted to sync...',
      imageUrl: '/img/man.png',
      imageAlt: 'Chakra UI',
    },
    // Add more posts as needed
  ];
  useEffect(() => {
    // Simulate a delay for demonstration purposes (you can replace this with your actual data fetching logic)
    const fetchData = async () => {
      try {
        // Simulate a delay of 2 seconds (adjust as needed)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false); // Set loading to false when data is loaded
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

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
export default home
