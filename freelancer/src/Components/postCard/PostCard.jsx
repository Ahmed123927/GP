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
  useColorModeValue,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiLike, BiCheckCircle, BiEdit, BiTrash } from 'react-icons/bi';

const PostCard = ({ post, user }) => {
  if (!post || !user) {
    return null; // Handle case where post or user data is missing
  }

  const {
    _id,
    title = '',
    cover = { secure_url: '' }, // Provide default value for cover object
    description = '',
    owner = '',
  } = post;

  const {
    userName = '',
    img, // Ignore image data if null
    CompanyName = '',
    role = '',
  } = user;

  const cardBodyRef = useRef();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const maxHeight = cardBodyRef.current.scrollHeight;
    cardBodyRef.current.style.height = `${maxHeight}px`;
  }, [description]);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const handleUpdateClick = () => {
    // Implement update logic
  };

  const handleDeleteClick = () => {
    // Implement delete logic
  };

  const handleApplyClick = () => {
  
    console.log("Post ID:", _id);
    console.log("Navigation URL:", `/applicant/${_id}`);
    window.location.href = `/applicant/${_id}`;
  };

  const borderColor = useColorModeValue('gray.200', 'white');

  return (
    <Box style={{ height: '100%' }}>
      <Card maxW="md" borderColor={borderColor} borderWidth="1px" borderRadius="md" p={4} h="100%">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
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
        <CardBody ref={cardBodyRef} overflow="auto" maxHeight="100px">
          <Text>{title}</Text>
        </CardBody>
        <Box h="200px" overflow="hidden">
          {cover.secure_url && <Image src={cover.secure_url} alt={title} h="100%" w="100%" />}
        </Box>

        <CardFooter justify="space-between" flexWrap="wrap">
          <>
            <IconButton
              flex="1"
              variant="ghost"
              aria-label="Edit post"
              icon={<BiEdit />}
              onClick={handleUpdateClick}
            />
            <IconButton
              flex="1"
              variant="ghost"
              aria-label="Delete post"
              icon={<BiTrash />}
              onClick={handleDeleteClick}
            />
          </>
          {/* Add IconButton to show who has applied */}
          <IconButton
            flex="1"
            variant="ghost"
            colorScheme="teal"
            aria-label="Show applicants"
            icon={<BiCheckCircle />}
            size="md"
            onClick={handleApplyClick}
          />
        </CardFooter>
      </Card>
    </Box>
  );
};

export default PostCard;
