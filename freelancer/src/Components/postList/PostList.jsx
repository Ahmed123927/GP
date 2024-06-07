import React from 'react';
import { Container, SimpleGrid, Text, Heading, Box, useColorModeValue } from '@chakra-ui/react';
import PostCard from './../postCard/PostCard';
import PostCardFreelancer from '../postCard/PostCardFreelancer';

const PostList = ({ posts }) => {
  const bgColor = useColorModeValue('gray.100', 'gray.700'); 
  const textColor = useColorModeValue('teal.500', 'teal.300'); 

  return (
    <Container maxW="container.xl" centerContent>
      <Box
        bg={bgColor}
        p={8}
        borderRadius="lg"
        boxShadow="md"
        transition="0.3s"
        _hover={{
          boxShadow: 'xl',
        }}
      >
        <Heading as="h1" fontSize="3xl" mb={6} textAlign="center" fontFamily="heading" color={textColor}>
          Related Posts
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} align="stretch">
          {posts.map((post) => (
                     <PostCardFreelancer key={post._id} post={post} postId={post._id} />

          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default PostList;
