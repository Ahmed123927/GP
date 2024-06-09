import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, Text, Flex, Button, Input, Textarea, useToast } from "@chakra-ui/react";
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState(null);
  const [requirements, setRequirements] = useState([]);
  const [skill, setSkill] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/client/showpost/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });
        const { title, description, category, requirements, cover } = response.data;
        setTitle(title);
        setDescription(description);
        setCategory(category);
        setRequirements(requirements);
        setCover(cover);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');

      const updatedPost = {
        title,
        description,
        category,
        requirements
      };

      const response = await axios.put(
        `http://localhost:3500/client/updatePost/${postId}`,
        updatedPost,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast({
        title: "Success!",
        description: "Post updated successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Optionally, redirect here or perform any other action
      // navigate(`/client/showpost/${postId}`);
    } catch (error) {
      console.error("Error updating post:", error);
      setErrorMsg("Failed to update post. Please try again.");
    }
  };

  const handleAddRequirement = () => {
    if (skill.trim() !== "") {
      const newSkills = skill.trim().split(",");
      setRequirements([...requirements, ...newSkills]);
      setSkill(""); 
    }
  };

  const handleRemoveRequirement = (index) => {
    const newRequirements = requirements.filter((_, i) => i !== index);
    setRequirements(newRequirements);
  };

  return (
    <Box px={4} py={6} mx="auto" maxW="lg" borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h1" fontSize="3xl" fontWeight="bold" mb={4} textAlign="center">
        Update Post
      </Heading>
      <Text color="gray.600" mb={6} textAlign="center">
        Modify the details below to update your post.
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
          <Input type="file" id="cover" disabled />
        </Box>

        <Box mb={4}>
          <label htmlFor="skills" style={{ display: 'block', marginBottom: '0.5rem' }}>Skills</label>
          <Flex alignItems="center">
            <Input flex="1" id="skills" placeholder="Enter a skill" size="lg" value={skill} onChange={(e) => setSkill(e.target.value)} />
            <Button size="lg" ml={2} colorScheme="blue" onClick={handleAddRequirement}>Add</Button>
          </Flex>
          <Flex flexWrap="wrap" mt={2} mb={4}>
            {requirements.map((requirement, index) => (
              <Flex key={index} alignItems="center" mr={2} mb={2}>
                <Button size="sm" variant="outline" mr={2}>{requirement}</Button>
                <Button size="sm" colorScheme="red" onClick={() => handleRemoveRequirement(index)}>Remove</Button>
              </Flex>
            ))}
          </Flex>
        </Box>

        <Flex justifyContent="space-between" alignItems="center">
          <Button type="button" size="lg" onClick={() => navigate(-1)}>Back</Button>
          <Button type="submit" size="lg" colorScheme="blue">Update</Button>
        </Flex>
      </form>
      
      {errorMsg && <Text color="red">{errorMsg}</Text>}
    </Box>
  );
};

export default UpdatePost;
