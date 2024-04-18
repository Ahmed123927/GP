import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie library
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Check if the user is already logged in
    if (localStorage.getItem('jwtToken')) {
      console.log('User is already logged in.');
      return;
    }

    // Validation: Check if email and password are provided
    if (!email || !password) {
      setErrorMsg('Please provide both email and password.');
      return;
    }

    setErrorMsg(''); // Clear any previous error message

    try {
      console.log('Logging in...');
      const response = await axios.post('http://localhost:3500/auth/login', {
        email,
        password,
      });

      const token = response.data.token;

      // Store the JWT token in both local storage and as a cookie
      localStorage.setItem('jwtToken', token);
      Cookies.set('jwt', token, { expires: 7 });

      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));

      const userId = payload.id;

      // Store the user ID in local storage
      localStorage.setItem('userId', userId);

      switch (payload.role) {
        case 'client':
          navigate('/client');
          break;
        case 'freelancer':
          navigate('/freelancer');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          console.error('Unexpected role:', payload.role);
          break;
      }
    } catch (error) {
      // Handle specific errors and display appropriate messages
      if (error.response && error.response.status === 401) {
        setErrorMsg('Invalid email or password. Please try again.');
      } else {
        console.error('Login failed:', error);
        setErrorMsg('Login failed. Please try again.');
      }
    }
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="teal" onClick={handleLogin}>
            Log In
          </Button>
          {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        </Stack>
      </Flex>
    </Stack>
  );
}

export default Login;
