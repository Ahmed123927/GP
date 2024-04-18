import React, { useRef, useEffect, useState } from 'react';
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
  useColorModeValue, // Import useColorModeValue
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiLike, BiChat, BiCheckCircle } from 'react-icons/bi';

const PostCard = ({ post }) => {
  // Check if post is undefined or null
  if (!post) {
    return null; // Or handle appropriately
  }

  const {
    author = '',
    authorRole = '',
    authorAvatar = '',
    content = '',
    imageUrl = '',
    imageAlt = '',
  } = post;

  const cardBodyRef = useRef();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const maxHeight = cardBodyRef.current.scrollHeight;
    cardBodyRef.current.style.height = `${maxHeight}px`;
  }, [content]);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const borderColor = useColorModeValue('gray.200', 'white'); // Conditionally set borderColor

  return (
    <Box>
      <Card maxW="md" borderColor={borderColor} borderWidth="1px" borderRadius="md" p={4}>
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name={author} src={authorAvatar} />

              <Box>
                <Heading size="sm">{author}</Heading>
                <Text>{authorRole}</Text>
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
        <CardBody ref={cardBodyRef} overflow="auto" maxHeight="100px">
          <Text>{content}</Text>
        </CardBody>
        <Image objectFit="cover" src={imageUrl} alt={imageAlt} />

        <CardFooter justify="space-between" flexWrap="wrap">
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<BiLike />}
            color={isLiked ? 'blue.500' : 'black.500'}
            onClick={handleLikeToggle}
          >
            Like
          </Button>
          {/* <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
            Comment
          </Button> */}
          <Button flex="1" variant="ghost" leftIcon={<BiCheckCircle />} >
            Apply
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default PostCard;
