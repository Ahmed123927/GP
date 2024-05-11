import React from 'react';
import { chakra, Avatar, Box, Text, Stack, useColorModeValue } from '@chakra-ui/react';

const OurClient = ({ name, position, company, content, image }) => {
  return (
    <Stack direction="column" mb={8} spacing={6} alignItems="center">
      <Stack
        maxW="345px"
        p={6}
        boxShadow="lg"
        rounded="md"
        pos="relative"
        bg={useColorModeValue('white', 'gray.800')}
        transform="rotate(-4deg)"
        _after={{
          content: `""`,
          borderColor: `${useColorModeValue('#eff5f1', '#252d3a')} transparent`,
          borderStyle: 'solid',
          borderWidth: '25px 30px 0 0',
          position: 'absolute',
          bottom: '-25px',
          left: '40px',
          display: 'block'
        }}
      >
        <Box
          position="relative"
          rounded="md"
          transform="rotate(4deg)"
          _before={{
            content: '""',
            bg: useColorModeValue('green.200', 'gray.600'),
            filter: 'blur(55px)',
            position: 'absolute',
            top: '-0.15rem',
            right: '-0.15rem',
            bottom: '-0.15rem',
            left: '-0.15rem',
            borderRadius: '5px'
          }}
        >
          <chakra.p position="relative">{content}</chakra.p>
        </Box>
      </Stack>
      <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
        <Avatar size="lg" showBorder={true} borderColor="green.400" name={name} src={image} />
        <Box direction="column" textAlign="center">
          <Text fontWeight="bold" fontSize="md">
            {name}
          </Text>
          <Text fontWeight="medium" fontSize="xs" color="gray.400">
            {position}, {company}
          </Text>
        </Box>
      </Stack>
    </Stack>
  );
};

export default OurClient;
