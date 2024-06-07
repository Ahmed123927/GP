import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
  HStack,
  Textarea,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const staticMessage = "You are accepted in my post";

export default function FreelancerCard({
  id,
  name,
  username,
  bio,
  tags = [], // Default to an empty array if tags are undefined
  avatarSrc,
  postId,
  onDecline,
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3500/client/rate/${userId}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });

        if (response.status === 200) {
          const { rate, comment } = response.data;
          setRating(rate);
          setComment(comment);
        } else {
          console.error('Failed to fetch rating:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred while fetching the rating:', error);
      }
    };

    fetchRating();
  }, [id]);

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(`http://localhost:3500/message/send/${id}`, {
        message: staticMessage,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });

      if (response.status === 201) {
        window.location.href = '/chat';
      } else {
        console.error('Failed to create new chat:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while creating a new chat:', error);
    }
  };

  const handleRating = async (rate) => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.patch(`http://localhost:3500/client/rate/${userId}`, {
        freelancerId: id,
        rate,
        comment,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });

      if (response.status === 200) {
        setRating(rate);
      } else {
        console.error('Failed to rate freelancer:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while rating the freelancer:', error);
    }
  };

// Inside the FreelancerCard component
const handleDecline = async () => {
  onDecline(id); // Inform the parent component about the decline
};


  const navigateToProfile = () => {
    navigate(`/freelancer-profile/${id}`);
  };

  return (
    <Center py={6}>
      <Box
        maxW={'320px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}>
        <Avatar
          size={'xl'}
          src={avatarSrc}
          alt={`Avatar of ${name}`}
          mb={4}
          pos={'relative'}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
        <Heading
          fontSize={'2xl'}
          fontFamily={'body'}
          onClick={navigateToProfile}
          style={{ cursor: 'pointer', color: 'blue' }}
        >
          {name}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {username}
        </Text>
        <Text textAlign={'center'} color={useColorModeValue('gray.700', 'gray.400')} px={3}>
          {bio}
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          {tags.map((tag, index) => (
            <Badge
              key={index}
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              {tag}
            </Badge>
          ))}
        </Stack>

        <HStack justify="center" mt={4}>
          {[...Array(5)].map((_, index) => {
            const starIndex = index + 1;
            return (
              <FaStar
                key={starIndex}
                size={24}
                color={starIndex <= (hover || rating) ? 'gold' : 'gray'}
                onClick={() => setRating(starIndex)}
                onMouseEnter={() => setHover(starIndex)}
                onMouseLeave={() => setHover(rating)}
                style={{ cursor: 'pointer' }}
              />
            );
          })}
        </HStack>

        <Textarea
          placeholder="Leave a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          mt={4}
        />

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            onClick={handleDecline}
            _focus={{
              bg: 'gray.200',
            }}>
            Decline
          </Button>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
            onClick={handleSendMessage}
          >
            Message
          </Button>
        </Stack>

        <Button
          mt={4}
          colorScheme="teal"
          onClick={() => handleRating(rating)}
          disabled={rating === 0 || comment.trim() === ''}
        >
          Submit Rating
        </Button>
      </Box>
    </Center>
  );
}

FreelancerCard.defaultProps = {
  tags: [],
};
