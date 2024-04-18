import React from 'react';
import {
  Box,
  Container,
  Heading,
  Button,
  useColorModeValue,
  Text,
  Image,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const Featured = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="featured"
      boxShadow="lg"
      borderRadius="lg"
      p={{ base: '6', md: '12' }}
    >
      <Container maxW="container.xl">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <motion.div variants={slideInRight} flex="1" pr={{ base: '0', md: '7' }}>
            <Heading
              as="h2"
              fontSize={{ base: '2xl', md: '3xl', lg: '5xl' }}
              fontWeight="bold"
              mb={{ base: '4', md: '2' }}
            >
              Elevate your{' '}
              <Text as="span" color="teal.500">
                freelance
              </Text>{' '}
              journey with unparalleled opportunities to showcase your skills and expertise.
            </Heading>
            <Button colorScheme="teal" size="lg">
              Explore Jobs
            </Button>
          </motion.div>
          <motion.div variants={slideInRight} flex="1" pl={{ base: '0', md: '7' }}>
            <Image
              src="/img/test.png"
              alt="Man"
              borderRadius="md"
              boxShadow="xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }}
            />
          </motion.div>
        </Flex>
      </Container>
    </motion.div>
  );
};

export default Featured;
