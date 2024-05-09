import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Textarea,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function UserProfileEdit() {
  const [profileData, setProfileData] = useState({
    img: '',
    userName: '',
    email: '',
    CompanyName: '',
    country: '',
    phone: '',
    skills: [],
  });

  const [previousSkills, setPreviousSkills] = useState([]);

  const [imageUrl, setImageUrl] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const role = localStorage.getItem('role');

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      setProfileData({
        ...profileData,
        img: file,
      });
      setImageUrl(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== '' && !profileData.skills.includes(newSkill.trim())) {
      const updatedSkills = [...profileData.skills, newSkill.trim()];
      setProfileData({
        ...profileData,
        skills: updatedSkills,
      });
      setNewSkill('');
    }
  };
  
  const handleRemoveSkill = (index) => {
    const updatedSkills = [...profileData.skills];
    updatedSkills.splice(index, 1);
    setProfileData({
      ...profileData,
      skills: updatedSkills,
    });
  };
  
  const handleUpdate = async () => {
    try {
      const jwtToken = localStorage.getItem('jwtToken');
      let updateUrl;
  
      if (role === 'freelancer') {
        updateUrl = 'http://localhost:3500/user/update';
      } else {
        updateUrl = 'http://localhost:3500/client/update';
      }
  
      let userData = { ...profileData };
  
      if (profileData.img instanceof File) {
        const formData = new FormData();
        formData.append('file', profileData.img);
  
        const uploadResponse = await axios.patch('http://localhost:3500/user/image', formData, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });
  
        userData.img = uploadResponse.data.secure_url;
      }
  
      if (!(profileData.img instanceof File)) {
        delete userData.img;
      }
  
      // Merge previous skills with new skills
      const mergedSkills = [...previousSkills, ...profileData.skills];
      userData.skills = mergedSkills;
  
      const response = await axios.patch(updateUrl, userData, {
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
    let fetchUrl;

    if (role === 'freelancer') {
      fetchUrl = 'http://localhost:3500/user';
    } else {
      fetchUrl = 'http://localhost:3500/client';
    }

    axios.interceptors.request.use(config => {
      if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
      }
      return config;
    });

    axios.get(fetchUrl)
      .then(response => {
        const userData = response.data.user;
        setProfileData({
          img: userData.img ? userData.img.secure_url || '' : '',
          userName: userData.userName || '',
          email: userData.email || '',
          CompanyName: userData.CompanyName || '',
          country: userData.country || '',
          phone: userData.phone || '',
          skills: typeof userData.skills === 'string' ? userData.skills.split(',').map(skill => skill.trim()) : [],
        });
        setImageUrl(userData.img ? userData.img.secure_url || '' : '');
        setPreviousSkills(userData.skills || []); // Fetch previous skills
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [role]);

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
            <Avatar size="xl" src={imageUrl} />
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
        {role !== 'freelancer' && (
          <FormControl>
            <FormLabel>Company Name</FormLabel>
            <Input type="text" name="CompanyName" value={profileData.CompanyName} onChange={handleChange} />
          </FormControl>
        )}
        <FormControl>
          <FormLabel>Country</FormLabel>
          <Input type="text" name="country" value={profileData.country} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input type="tel" name="phone" value={profileData.phone} onChange={handleChange} />
        </FormControl>
        {role === 'freelancer' && (
  <FormControl>
    <FormLabel>Skills</FormLabel>
    <Flex alignItems="center">
      <Input flex="1" placeholder="Enter a skill" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} />
      <Button size="lg" ml={2} colorScheme="blue" onClick={handleAddSkill}>Add</Button>
    </Flex>
    <Flex flexWrap="wrap" mt={2}>
      {/* Render existing skills */}
      {profileData.skills.map((skill, index) => (
        <Tag key={index} size="md" borderRadius="full" variant="solid" colorScheme="teal" mr={2} mb={2}>
          <TagLabel>{skill}</TagLabel>
          <TagCloseButton onClick={() => handleRemoveSkill(index)} />
        </Tag>
      ))}
      {/* Render previous skills */}
      {previousSkills.map((skill, index) => (
        <Tag key={index} size="md" borderRadius="full" variant="outline" colorScheme="gray" mr={2} mb={2}>
          <TagLabel>{skill}</TagLabel>
        </Tag>
      ))}
    </Flex>
  </FormControl>
)}

        <Flex justifyContent="space-between" alignItems="center">
          <Button onClick={handleUpdate} colorScheme="blue">Update Profile</Button>
        </Flex>
      </Stack>
    </Flex>
  );
}