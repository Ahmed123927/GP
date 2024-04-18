import React, { useState, useEffect } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from '@chakra-ui/react';
import axios from 'axios';

export default function UserProfileEdit() {
  const [profileData, setProfileData] = useState({
    img: '',
    userName: '',
    email: '',
    CompanyName: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setProfileData({
      ...profileData,
      img: e.target.files[0],
    });
  };

  const handleUpdate = async () => {
    let userData = { ...profileData }; // Create a copy of profileData

    // If img is a string, convert it to an object with secure_url key
    if (typeof profileData.img === 'string') {
      userData.img = { secure_url: profileData.img };
    }

    try {
      const jwtToken = localStorage.getItem('jwtToken');
      const response = await axios.patch('http://localhost:3500/client/update', userData, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });

      console.log('User data updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');

    axios.interceptors.request.use(config => {
      if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
      }
      return config;
    });

    axios.get('http://localhost:3500/client')
      .then(response => {
        const userData = response.data.user;
        setProfileData({
          img: userData.img ? userData.img.secure_url || '' : '',
          userName: userData.userName || '',
          email: userData.email || '',
          CompanyName: userData.CompanyName || '',
          country: userData.country || '',
          phone: userData.phone || '',
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl>
          <FormLabel>Change Icon</FormLabel>
          <Center>
            <Avatar size="xl" src={profileData.img} />
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </Center>
        </FormControl>
        <FormControl>
          <FormLabel>User Name</FormLabel>
          <Input type="text" name="userName" value={profileData.userName} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={profileData.email} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Company Name</FormLabel>
          <Input type="text" name="CompanyName" value={profileData.CompanyName} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Country</FormLabel>
          <Input type="text" name="country" value={profileData.country} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input type="tel" name="phone" value={profileData.phone} onChange={handleChange} />
        </FormControl>
        <Button onClick={handleUpdate} colorScheme="blue">Update Profile</Button>
      </Stack>
    </Flex>
  );
}
