import { motion } from 'framer-motion';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const MotionContainer = motion(Container);
const MotionStack = motion(Stack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const ClientFeatured = () => {
  const Arrow = createIcon({});

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const stackVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 2, delay: 0.2 } },
  };

  return (
    <MotionContainer
      maxW={'3xl'}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <MotionStack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
        variants={stackVariants}
      >
        <MotionHeading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Find the perfect freelancer for your project <br />
          <Text as={'span'} color={'teal.500'}>
            and get it done right!
          </Text>
        </MotionHeading>
        <MotionText color={'gray.500'}>
          Post your job and connect with skilled freelancers. Get your work done efficiently and collaborate with professionals to bring your projects to life.
        </MotionText>
        <MotionStack
          direction={'column'}
          spacing={3}
          align={'center'}
          alignSelf={'center'}
          position={'relative'}
        >
          <Link to="/addpost">
            <MotionButton
              colorScheme={'green'}
              bg={'teal.500'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}
            >
              Get Started
            </MotionButton>
          </Link>
          <Box>
            <Icon
              as={Arrow}
              color={useColorModeValue('gray.800', 'gray.300')}
              w={71}
              position={'absolute'}
              right={-71}
              top={'10px'}
            />
          </Box>
        </MotionStack>
      </MotionStack>
    </MotionContainer>
  );
};

export default ClientFeatured;
