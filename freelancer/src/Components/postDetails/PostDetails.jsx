import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  useToast,
} from '@chakra-ui/react';
import { MdLocalShipping } from 'react-icons/md';
import { useParams } from 'react-router-dom';

export default function PostDetails() {
  const { _id } = useParams();
  const [post, setPost] = useState(null);
  const toast = useToast();

  useEffect(() => {
    axios.get(`http://localhost:3500/client/showpost/${_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    })
    .then(response => {
      setPost(response.data);
    })
    .catch(error => {
      console.error('Error fetching post details:', error);
    });
  }, [_id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const {
    title = '',
    cover = '',
    description = '',
    owner = {},
    requirements = [],
  } = post;

  const {
    userName = '',
    CompanyName = '',
  } = owner;

  const handleApply = () => {
    axios.patch(`http://localhost:3500/user/apply/${_id}`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      }
    })
    .then(response => {
      toast({
        title: "Application Successful",
        description: "You are in the waiting list",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    })
    .catch(error => {
      if (error.response && error.response.status === 409) {
        toast({
          title: "Application Error",
          description: "You have already applied for this post",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.error('Error applying for job:', error);
      }
    });
  };

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex>
          <Image
            rounded={'md'}
            alt={'product image'}
            src={cover.secure_url}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {title}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}>
              {CompanyName}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={'lg'}>{description}</Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Required Skills
              </Text>

              <List spacing={2}>
                {requirements.map((requirement, index) => (
                  <ListItem key={index}>{requirement}</ListItem>
                ))}
              </List>
            </Box>
          </Stack>

          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
            onClick={handleApply}>
            Apply
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <Text>Get Started </Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
