import React from 'react';
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
} from '@chakra-ui/react';
import axios from 'axios'; 

const staticMessage = "You are accepted in my post";

export default function FreelancerCard({ id, name, username, bio, tags, avatarSrc }) {
  
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
        console.log(response) 
      }
    } catch (error) {
      console.error('An error occurred while creating a new chat:', error);
    }
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
        <Heading fontSize={'2xl'} fontFamily={'body'}>
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

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            onClick={() => {
              // Implement decline functionality if needed
            }}
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
            onClick={handleSendMessage} // Call handleSendMessage function when the button is clicked
           >
          message
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
