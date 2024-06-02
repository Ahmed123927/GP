import React, { useState } from "react";
import axios from "axios";
import { Box, Heading, Text, Flex, Button, Input, Textarea, useToast } from "@chakra-ui/react";
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

function ClientAddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState(null);
  const [requirements, setRequirements] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const toast = useToast(); // Initialize the useToast hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('jwtToken');
      // Create a new FormData instance
      const formData = new FormData();

      // Append the fields to the FormData instance
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('requirements', JSON.stringify(requirements.map(req => req)));
      formData.append('file', cover);

      const response = await axios.post(
        "http://localhost:3500/client/addpost", 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log("Post response:", response);

      // Show success toast
      toast({
        title: "Success!",
        description: "Post added successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

    } catch (error) {
      console.error("Error posting:", error);
      setErrorMsg("Failed to add post. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    setCover(e.target.files[0]);
  };

  const handleAddRequirement = () => {
    if (category.trim() !== "") {
      setRequirements([...requirements, category.trim()]);
      setCategory(""); 
    }
  };

  return (
    <Box px={4} py={6} mx="auto" maxW="lg" borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h1" fontSize="3xl" fontWeight="bold" mb={4} textAlign="center">
        Add a New Post
      </Heading>
      <Text color="gray.600" mb={6} textAlign="center">
        Fill in the details below to add a new post to hire freelancer.
      </Text>
      <form onSubmit={handleSubmit}>
        <Box mb={4}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem' }}>Title</label>
          <Input id="title" placeholder="Enter the title" size="lg" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Box>

        <Box mb={4}>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
          <Textarea id="description" placeholder="Enter the description" size="lg" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Box>

        <Box mb={4}>
          <label htmlFor="cover" style={{ display: 'block', marginBottom: '0.5rem' }}>Cover Image</label>
          <Input type="file" id="cover" onChange={handleFileChange} />
        </Box>

        <Box mb={4}>
          <label htmlFor="skills" style={{ display: 'block', marginBottom: '0.5rem' }}>Skills</label>
          <Flex alignItems="center">
            <Input flex="1" id="skills" placeholder="Enter a skill" size="lg" value={category} onChange={(e) => setCategory(e.target.value)} />
            <Button size="lg" ml={2} colorScheme="blue" onClick={handleAddRequirement}>Add</Button>
          </Flex>
          <Flex flexWrap="wrap" mt={2} mb={4}>
            {requirements.map((requirement, index) => (
              <Button key={index} size="sm" variant="outline" mr={2} mb={2}>{requirement}</Button>
            ))}
          </Flex>
        </Box>

        <Flex justifyContent="space-between" alignItems="center">
          {/* Use Link from react-router-dom */}
          <Link to="/client" style={{ textDecoration: 'none' }}>
            <Flex alignItems="center">
              <Box as="span" w={6} h={6} borderWidth={1} borderRadius="full" mr={2} />
              <Text fontSize="lg" fontWeight="bold" color="blue.500">Back to Home</Text>
            </Flex>
          </Link>
          <Button type="submit" size="lg" colorScheme="blue">Save</Button>
        </Flex>
      </form>
      {errorMsg && <Text color="red">{errorMsg}</Text>}
    </Box>
  );
}

export default ClientAddPost;
