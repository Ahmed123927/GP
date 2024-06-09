// File path: src/components/ClientAddPost.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, Text, Flex, Button, Input, Textarea, Select, useToast } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

function ClientAddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState(null);
  const [requirements, setRequirements] = useState([]);
  const [skill, setSkill] = useState(""); 
  const [errorMsg, setErrorMsg] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("usd");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (currency === "usd" || currency === "euro") {
      setAmount(2);
    } else if (currency === "egp") {
      setAmount(100);
    }
  }, [currency]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const paymentDetails = paymentMethod === "paypal" ? 
      {
        method: paymentMethod,
        amount: amount,
        currency: currency,
        paypalEmail: paypalEmail
      } : 
      {
        method: paymentMethod,
        amount: amount,
        currency: currency,
        cardNumber: cardNumber,
        cardExpiry: cardExpiry,
        cardCVC: cardCVC
      };
  
    try {
      const token = localStorage.getItem('jwtToken');
      
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('requirements', requirements.join(', ')); 
      formData.append('file', cover);
  
      Object.entries(paymentDetails).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      console.log('Form Data:');
      formData.forEach((value, key) => {
        console.log(key, value);
      });
  
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
      toast({
        title: "Success!",
        description: "Post added successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error response data:", error.response.data);
      }
      console.error("Error posting:", error);
      setErrorMsg("Failed to add post. Please try again.");
    }
  };
  

  const handleFileChange = (e) => {
    setCover(e.target.files[0]);
  };

  const handleAddRequirement = () => {
    if (skill.trim() !== "") {
      const newSkills = skill.trim().split(",").map(skill => skill.trim()); // Split by commas and trim each skill
      setRequirements(prevRequirements => [...prevRequirements, ...newSkills]);
      setSkill(""); 
    }
  };
  
  

  return (
    <Box px={4} py={6} mx="auto" maxW="lg" borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h1" fontSize="3xl" fontWeight="bold" mb={4} textAlign="center">
        Add a New Post
      </Heading>
      <Text color="gray.600" mb={6} textAlign="center">
        Fill in the details below to add a new post to hire freelancer
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
            <Input flex="1" id="skills" placeholder="Enter a skill" size="lg" value={skill} onChange={(e) => setSkill(e.target.value)} />
            <Button size="lg" ml={2} colorScheme="blue" onClick={handleAddRequirement}>Add</Button>
          </Flex>
          <Flex flexWrap="wrap" mt={2} mb={4}>
            {requirements.map((requirement, index) => (
              <Button key={index} size="sm" variant="outline" mr={2} mb={2}>{requirement}</Button>
            ))}
          </Flex>
        </Box>
        <Text color="gray.600" mb={6} textAlign="center">
        Your First Post For Free
      </Text>
        <Box mb={4}>
          <label htmlFor="paymentMethod" style={{ display: 'block', marginBottom: '0.5rem' }}>Payment Method</label>
          <Flex>
            <Button size="lg" colorScheme={paymentMethod === "visa" ? "blue" : "gray"} mr={2} onClick={() => setPaymentMethod("visa")}>Credit Card</Button>
            <Button size="lg" colorScheme={paymentMethod === "paypal" ? "blue" : "gray"} onClick={() => setPaymentMethod("paypal")}>PayPal</Button>
          </Flex>
        </Box>

        {paymentMethod === "visa" && (
          <>
            <Box mb={4}>
              <label htmlFor="cardNumber" style={{ display: 'block', marginBottom: '0.5rem' }}>Card Number</label>
              <Input id="cardNumber" placeholder="Enter card number" size="lg" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
            </Box>
            <Box mb={4}>
              <label htmlFor="cardExpiry" style={{ display: 'block', marginBottom: '0.5rem' }}>Card Expiry</label>
              <Input id="cardExpiry" placeholder="MM/YY" size="lg" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} />
            </Box>
            <Box mb={4}>
              <label htmlFor="cardCVC" style={{ display: 'block', marginBottom: '0.5rem' }}>Card CVC</label>
              <Input id="cardCVC" placeholder="CVC" size="lg" value={cardCVC} onChange={(e) => setCardCVC(e.target.value)} />
            </Box>
          </>
        )}

        {paymentMethod === "paypal" && (
          <Box mb={4}>
            <label htmlFor="paypalEmail" style={{ display: 'block', marginBottom: '0.5rem' }}>PayPal Email</label>
            <Input id="paypalEmail" placeholder="Enter PayPal email" size="lg" value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)} />
          </Box>
        )}

        <Box mb={4}>
          <label htmlFor="currency" style={{ display: 'block', marginBottom: '0.5rem' }}>Currency</label>
          <Select id="currency" size="lg" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="usd">USD</option>
            <option value="euro">Euro</option>
            <option value="egp">EGP</option>
          </Select>
        </Box>

        <Box mb={4}>
          <label htmlFor="amount" style={{ display: 'block', marginBottom: '0.5rem' }}>Amount</label>
          <Input id="amount" placeholder="Enter amount" size="lg" value={amount} isReadOnly />
        </Box>

        <Flex justifyContent="space-between" alignItems="center">
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
