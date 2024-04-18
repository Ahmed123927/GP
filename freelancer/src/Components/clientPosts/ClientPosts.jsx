import React from 'react';
import { Container, SimpleGrid, Text, Heading, Box, useColorModeValue, Center, Image } from '@chakra-ui/react';
import PostCard from './../postCard/PostCard'; // Import the PostCard component

const ClientPosts = ({ posts }) => {
  const bgColor = useColorModeValue('gray.100', 'gray.700'); // Adjust background color based on color mode
  const textColor = useColorModeValue('teal.500', 'teal.300'); // Adjust text color based on color mode

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
        {posts.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} align="stretch">
            {posts.map((post) => (
              <PostCard key={post.id} post={post}>
                <Text isTruncated>{post.content}</Text>
              </PostCard>
            ))}
          </SimpleGrid>
        ) : (
          <Center flexDirection="column" textAlign="center">
            <Image src="/empty.svg" alt="Empty State" maxW="200px" mx="auto" mb={4} /> {/* Use a placeholder image */}
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
