import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Flex, Heading, Text, Avatar, Badge, Divider, Spinner, useToast, VStack, HStack, Container, Center, SimpleGrid, Stack, Card, CardHeader, CardBody, CardFooter
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import PostCardFreelancer from '../postCard/PostCardFreelancer';

const FreelancerProfile = () => {
  const { freelancerId } = useParams();
  const [freelancer, setFreelancer] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchFreelancerData = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/user/${freelancerId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
        });

        setFreelancer(response.data.user);
        setRatings(response.data.ratings);

        const postIds = response.data.ratings.map(rating => rating.postId);
        const postPromises = postIds.map(postId =>
          axios.get(`http://localhost:3500/client/showpost/${postId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
          }).then(res => res.data.post)
        );

        const fetchedPosts = await Promise.all(postPromises);
        setPosts(fetchedPosts.filter(post => post));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching freelancer data:', error);
        toast({
          title: "Error",
          description: "Failed to fetch freelancer data.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      }
    };

    fetchFreelancerData();
  }, [freelancerId, toast]);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!freelancer) {
    return (
      <Text textAlign="center" mt={10}>
        Data not available.
      </Text>
    );
  }

  return (
    <Container maxW="1200px" px={4} py={6}>
      <Center mb={6}>
        <Card w="full" maxW="lg" boxShadow="lg">
          <CardHeader>
            <Center>
              <Avatar src={freelancer.img.secure_url} size="2xl" mb={4} />
            </Center>
            <Center>
              <Heading>{freelancer.userName}</Heading>
            </Center>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Text><strong>Email:</strong> {freelancer.email}</Text>
              <Text><strong>Bio:</strong> {freelancer.desc}</Text>
              <Text><strong>Job Title:</strong> {freelancer.jobtitle}</Text>
              <Text><strong>Country:</strong> {freelancer.country}</Text>
              <Text><strong>Phone:</strong> {freelancer.phone}</Text>

              <HStack wrap="wrap" spacing={2}>
              <Text><strong>Skills:</strong> </Text>
                {freelancer.skills.map((skill, index) => (
                  <Badge key={index} px={2} py={1} bg="blue.50" fontWeight="400">
                    {skill}
                  </Badge>
                ))}
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </Center>

      <Divider my={6} />

      <Heading as="h3" size="lg" mb={4}>
        Ratings & Comments
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {ratings.map((rating, index) => (
          <Card key={rating._id} p={4} shadow="md" borderWidth="1px" borderRadius="md">
            <CardHeader>
              <Flex align="center">
                <HStack spacing={1}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} color={i < rating.rate ? 'gold' : 'gray'} />
                  ))}
                </HStack>
                <Text ml={2} fontWeight="bold">{`Rated: ${rating.rate} Stars`}</Text>
              </Flex>
            </CardHeader>
            <CardBody>
              <Text fontStyle="italic">{rating.comment}</Text>
            </CardBody>
            <CardFooter>
              {posts[index] && (
                <PostCardFreelancer post={posts[index]} postId={posts[index]._id} />
              )}
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default FreelancerProfile;
