import React, { useState } from 'react';
import { Container, SimpleGrid, Text, Heading, Box, useColorModeValue, Center, Image } from '@chakra-ui/react';
import PostCard from './../postCard/PostCard'; 

const ClientPosts = ({ user, posts }) => {
  const bgColor = useColorModeValue('gray.100', 'gray.700'); 
  const textColor = useColorModeValue('teal.500', 'teal.300'); 

  const [updatedPosts, setUpdatedPosts] = useState(posts);

  const handleDeletePost = (postId) => {
    // Filter out the deleted post
    const updatedPostsList = updatedPosts.filter(post => post._id !== postId);
    setUpdatedPosts(updatedPostsList);
  };

  if (!posts) {
    return null;
  }

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
          Your Posts
        </Heading>
        {updatedPosts.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} align="stretch">
            {updatedPosts.map((post) => (
              <PostCard key={post._id} post={post} user={user} onDelete={handleDeletePost} />
            ))}
          </SimpleGrid>
        ) : (
          <Center flexDirection="column" textAlign="center">
            <Image src="/img/exp p.png" alt="Empty State" maxW="200px" mx="auto" mb={4} /> 
            <Text color="gray.500" fontSize="lg">
              No Posts Yet
            </Text>
          </Center>
        )}
      </Box>
    </Container>
  );
};

export default ClientPosts;
