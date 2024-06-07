import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Container,
  Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [resetMode, setResetMode] = useState(false);
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromURL = searchParams.get('token');
    const emailFromURL = searchParams.get('email');
    if (tokenFromURL && emailFromURL) {
      setToken(tokenFromURL);
      setEmail(emailFromURL);
      setResetMode(true);
    }
  }, [searchParams]);

  const handleRequestCode = async () => {
    try {
      await axios.patch('http://localhost:3500/auth/forgetCode', { email });
      toast({
        title: 'Reset link sent.',
        description: 'Check your email for the reset link.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send reset link.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleResetPassword = async () => {
    try {
      await axios.patch('http://localhost:3500/auth/resetPassword', { token, password });
      toast({
        title: 'Password reset.',
        description: 'Your password has been reset successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setResetMode(false);
      setEmail('');
      setToken('');
      setPassword('');
      navigate('/login'); // Redirect to login page after successful reset
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reset password.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      bg="gray.50"
    >
      <Container maxW="md" centerContent>
        <Box p={8} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white" width="100%">
          <VStack spacing={4} align="stretch">
            <Heading size="lg" textAlign="center">Reset Password</Heading>
            {!resetMode ? (
              <>
                <Text>Enter your email to receive a reset link.</Text>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <Button colorScheme="blue" onClick={handleRequestCode}>Send Code</Button>
              </>
            ) : (
              <>
                <Text>Enter your new password.</Text>
                <FormControl id="password" isRequired>
                  <FormLabel>New Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Button colorScheme="blue" onClick={handleResetPassword}>Reset Password</Button>
              </>
            )}
          </VStack>
        </Box>
      </Container>
    </Flex>
  );
};

export default ResetPassword;
