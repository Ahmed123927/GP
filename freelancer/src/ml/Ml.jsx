import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
  } from '@chakra-ui/react';
  
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
                AI Tools Service
              </Text>
              <br />
              <Text color={'blue.400'} as={'span'}>
               That help you to work fast
              </Text>
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              The project board is an exclusive resource for contract work. It's
              perfect for freelancers, agencies, and moonlighters.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
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
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1} align={'center'} justify={'center'} p={8}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            boxSize={{ base: '80%', md: '60%', lg: '50%' }}
            borderRadius='lg'
            src={
              'img/Central Hospital Business.png'
            }
          />
        </Flex>
      </Stack>
    );
  }
  