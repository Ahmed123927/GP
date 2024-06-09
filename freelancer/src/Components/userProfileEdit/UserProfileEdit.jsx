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
  useToast,
  VStack,
  HStack,
  Container,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import PostCardFreelancer from '../postCard/PostCardFreelancer';
import { useParams } from 'react-router-dom';

export default function UserProfileEdit() {
  const [profileData, setProfileData] = useState({
    img: '',
    userName: '',
    email: '',
    CompanyName: '',
    country: '',
    phone: '',
    skills: [],
    desc: '',
    jobtitle: '',
  });
  const [imageUrl, setImageUrl] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [ratings, setRatings] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem('role');
  const toast = useToast();

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

      userData.skills = [...profileData.skills];

      const response = await axios.patch(updateUrl, userData, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });

      console.log('User data updated successfully:', response.data);

      toast({
        title: "Success!",
        description: "Profile updated successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    const fetchUrl = 'http://localhost:3500/user';

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
          skills: userData.skills || [],
          desc: userData.desc || '',
          jobtitle: userData.jobtitle || '',
        });
        setImageUrl(userData.img ? userData.img.secure_url || '' : '');

        // Fetch ratings and associated posts if role is 'freelancer'
        if (role === 'freelancer') {
          setRatings(response.data.ratings || []);
          const postIds = (response.data.ratings || []).map(rating => rating.postId);
          const postPromises = postIds.map(postId =>
            axios.get(`http://localhost:3500/client/showpost/${postId}`, {
              headers: { Authorization: `Bearer ${jwtToken}` },
            }).then(res => res.data).catch(error => {
              console.error(`Error fetching post ${postId}:`, error);
              return null;
            })
          );
          Promise.all(postPromises).then(fetchedPosts => {
            setPosts(fetchedPosts.filter(post => post));
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxW="1200px" px={4} py={6}>
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
            <>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea name="desc" value={profileData.desc} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Job Title</FormLabel>
                <Input type="text" name="jobtitle" value={profileData.jobtitle} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Skills</FormLabel>
                <Flex alignItems="center">
                  <Input flex="1" placeholder="Enter a skill" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} />
                  <Button size="lg" ml={2} colorScheme="blue" onClick={handleAddSkill}>Add</Button>
                </Flex>
                <Flex flexWrap="wrap" mt={2}>
                  {profileData.skills.map((skill, index) => (
                    <Tag key={index} size="md" borderRadius="full" variant="solid" colorScheme="teal" mr={2} mb={2}>
                      <TagLabel>{skill}</TagLabel>
                      <TagCloseButton onClick={() => handleRemoveSkill(index)} />
                    </Tag>
                  ))}
                </Flex>
              </FormControl>
            </>
          )}
          <Flex justifyContent="space-between" alignItems="center">
            <Button onClick={handleUpdate} colorScheme="blue">Update Profile</Button>
          </Flex>
        </Stack>
      </Flex>

      {role === 'freelancer' && (
        <>
          <Divider my={6} />
          <Heading as="h3" size="lg" mb={4}>
            Ratings & Comments
          </Heading>
          {loading ? (
            <Center>
              <Spinner size="xl" />
            </Center>
          ) : (
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
                    {posts[index] ? (
                      <PostCardFreelancer post={posts[index]} postId={posts[index]._id} />
                    ) : (
                      <Text>No post associated</Text>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </>
      )}
    </Container>
  );
}
