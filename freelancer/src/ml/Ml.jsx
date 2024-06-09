import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Ml() {
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}
            >
              Discover AI Tools to Enhance Your Projects
            </Text>
            <br />
            <Text color={'blue.400'} as={'span'}>
              That help you to work fast
            </Text>
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            Leverage the power of AI to boost your productivity and achieve outstanding results. Our curated list of AI tools is designed to assist freelancers and clients in various aspects of their work, making the process more efficient, accurate, and innovative.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Link to="/ml">
              <Button
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                AI Tools
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1} align={'center'} justify={'center'} p={8}>
        <Image
          alt={'AI Tools Image'}
          objectFit={'cover'}
          boxSize={{ base: '80%', md: '60%', lg: '50%' }}
          borderRadius="lg"
          src={'img/Central Hospital Business.png'}
        />
      </Flex>
    </Stack>
  );
}
