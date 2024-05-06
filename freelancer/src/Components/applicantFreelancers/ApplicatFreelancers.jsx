import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FreelancerCard from '../freelancerCard/FreelancerCard';
import { Box, Flex, Heading, Text } from '@chakra-ui/react'; // Import Chakra UI components

export default function ApplicatFreelancers() {
  const { _id } = useParams();
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3500/client/applycount/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
          }
        });
        const data = await response.json();
        if (data && data['freelancers List']) {
          setFreelancers(data['freelancers List']);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [_id]);

  return (
    <Flex flexDirection="column" align="center" justify="center" height="70vh"> 
      <Heading as="h2" mb={4} textAlign="center" fontSize="2xl">Explore Talented Freelancers Who Applied On Your Post</Heading>
      <Text textAlign="center" color="gray.600">Discover a diverse pool of skilled freelancers ready to tackle your projects.</Text>
      <Flex flexWrap="wrap" justifyContent="space-around" mt={1} mb={1}> 
        {freelancers.map((freelancer, index) => (
          <Box key={index} m={2} width="300px" height="350px"> {/* Set fixed width and height for each card */}
            <FreelancerCard
              id={freelancer._id}
              name={freelancer.userName}
              username={freelancer.email}
              bio={freelancer.country}
              tags={freelancer.skills}
              avatarSrc={freelancer.img.secure_url}
            />
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}
