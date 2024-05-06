import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
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
    setErrorMsg('');
  
    try {
      console.log('Logging in...');
      const response = await axios.post('http://localhost:3500/auth/login', {
        email,
        password,
      });
      console.log('Login response:', response);
  
      const token = response.data.token;
      console.log('JWT token:', token);
  
      if (token) {
        
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userId');
  
        Cookies.remove('jwt');
  
        localStorage.setItem('jwtToken', token);
        Cookies.set('jwt', token, { expires: 7 }); 
  
        const tokenParts = token.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));
        console.log('Payload:', payload);
  
        const userId = payload.id;
        console.log('User ID:', userId);
  
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', payload.role);

        console.log('Role:', payload.role);
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
      } else {
        setErrorMsg('Login failed. Please try again.');
      }
      
      // Ensure proper cleanup
      window.location.reload(); // Reload the page to clear any stale data or components
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMsg('Login failed. Please try again.');
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
