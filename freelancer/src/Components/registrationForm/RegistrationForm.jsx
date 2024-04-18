import React, { useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Grid,
  useColorModeValue,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [selectedRole, setSelectedRole] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // State to manage success message

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setStep(2);
    setProgress(50);
  };

  const handleBack = () => {
    setStep(1);
    setProgress(50);
  };

  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(true); // Show success message
  };

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated></Progress>
        {step === 1 && <RoleChoice onSelectRole={handleRoleSelection} />}
        {step === 2 && <UserRegistration selectedRole={selectedRole} onRegistrationSuccess={handleRegistrationSuccess} />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={handleBack}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
            </Flex>
          </Flex>
        </ButtonGroup>
      </Box>
      {registrationSuccess && (
        <Alert status="success" mt={4}>
          <AlertIcon />
          Registration successful!
        </Alert>
      )}
    </>
  );
}

function RoleChoice({ onSelectRole }) {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Flex alignItems="center" justifyContent="center" minH="70vh">
      <Box w="full" maxW="3xl" bg={bgColor} p={8} rounded="lg" shadow="lg">
        <VStack spacing={8}>
          <Box>
            <Heading as="h2" size="xl" fontWeight="bold">
              Join Our Platform
            </Heading>
            <FormLabel fontSize="lg" color="gray.700">
              Choose the role that best fits your profile.
            </FormLabel>
          </Box>
          <Grid gap={6} templateColumns={{ md: 'repeat(2, 1fr)' }}>
            <Box
              bg={useColorModeValue('gray.100', 'gray.700')}
              rounded="lg"
              shadow="md"
              p={6}
              cursor="pointer"
              onClick={() => onSelectRole('client')}
            >
              <Flex alignItems="center" justifyContent="space-between">
                <Box>
                  {/* <FormLabel fontSize="lg" fontWeight="semibold">
                    Client
                  </FormLabel> */}
                </Box>
              </Flex>
              <Box mt={4}>
                <Button w="full" variant="outline">
                  Select Client
                </Button>
              </Box>
            </Box>
            <Box
              bg={useColorModeValue('white', 'gray.600')}
              rounded="lg"
              shadow="lg"
              p={8}
              cursor="pointer"
              onClick={() => onSelectRole('freelancer')}
            >
              <Flex alignItems="center" justifyContent="space-between">
                <Box>
                  {/* <FormLabel fontSize="lg" fontWeight="semibold">
                    Freelancer
                  </FormLabel> */}
                </Box>
              </Flex>
              <Box mt={4}>
                <Button w="full" variant="outline">
                  Select Freelancer
                </Button>
              </Box>
            </Box>
          </Grid>
        </VStack>
      </Box>
    </Flex>
  );
}

function UserRegistration({ selectedRole, onRegistrationSuccess }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      if (!selectedRole || (selectedRole !== 'freelancer' && selectedRole !== 'client')) {
        console.error('Invalid selected role');
        return;
      }

      const response = await fetch('http://localhost:3500/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: `${firstName}${lastName}`,
          email,
          password,
          role: selectedRole,
        }),
      });
      const data = await response.json();
      console.log('Registration successful:', data);
      onRegistrationSuccess(); 
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        User Registration
      </Heading>
      <Flex flexDirection="column">
        <FormControl mb="1rem">
          <FormLabel htmlFor="first-name" fontWeight={'normal'}>
            First name
          </FormLabel>
          <Input id="first-name" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </FormControl>

        <FormControl mb="1rem">
          <FormLabel htmlFor="last-name" fontWeight={'normal'}>
            Last name
          </FormLabel>
          <Input id="last-name" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </FormControl>

        <FormControl mb="1rem">
          <FormLabel htmlFor="email" fontWeight={'normal'}>
            Email address
          </FormLabel>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <FormLabel>We'll never share your email.</FormLabel>
        </FormControl>

        <FormControl mb="1rem">
          <FormLabel htmlFor="password" fontWeight={'normal'}>
            Password
          </FormLabel>
          <Input pr="4.5rem" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>

        <Button mt="1rem" colorScheme="teal" onClick={handleSubmit}>
          Submit
        </Button>
      </Flex>
    </>
  );
}
