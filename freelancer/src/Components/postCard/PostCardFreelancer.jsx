// PostCardFreelancer.jsx
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Box,
  Avatar,
  Heading,
  Text,
  IconButton,
  Image,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiLike, BiCheckCircle } from 'react-icons/bi';

const PostCardFreelancer = ({ post, postId }) => {
  console.log("Received Post ID:", postId); // Log the postId

  if (!post || !post._id) {
    return null; // Handle case where post data or _id is missing
  }

  const {
    _id,
    title = '',
    cover = { secure_url: '' },
    description = '',
    owner = {},
  } = post;

  const {
    userName = '',
    img = { secure_url: '' },
    CompanyName = '',
  } = owner;

  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const handleApplyClick = () => {
    window.location.href = `/postDetails/${post._id}`;
  };

  const borderColor = useColorModeValue('gray.200', 'white');

  return (
    <Box style={{ height: '500px', width: '400px', margin: '10px' }}>
      <Card borderColor={borderColor} borderWidth="1px" borderRadius="md" h="100%">
        <CardHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex gap="4" alignItems="center">
              {img && <Avatar name={userName} src={img.secure_url} />}
              <Box>
                <Heading size="sm">{userName}</Heading>
                <Text>{CompanyName}</Text>
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<BsThreeDotsVertical />}
            />
          </Flex>
        </CardHeader>
        <CardBody overflow="hidden" mb="4">
          <Text>{title}</Text>
        </CardBody>
        <Box h="300px" overflow="hidden" mb="4">
          {cover.secure_url && <Image src={cover.secure_url} alt={title} objectFit="cover" h="100%" w="100%" />}
        </Box>
        <CardFooter justifyContent="space-between">
          <Button
            leftIcon={<BiLike />}
            colorScheme={isLiked ? 'blue' : 'gray'}
            onClick={handleLikeToggle}
            size="sm"
            variant="ghost"
          >
            {isLiked ? 'Liked' : 'Like'}
          </Button>
          <Button
            leftIcon={<BiCheckCircle />}
            onClick={handleApplyClick}
            size="sm"
            variant="ghost"
          >
            Apply
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default PostCardFreelancer;
