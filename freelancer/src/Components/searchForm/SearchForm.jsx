import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Spinner,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Heading,
} from '@chakra-ui/react';
import styled, { keyframes } from 'styled-components';

const neonGlow = keyframes`
  0%, 100% {
    text-shadow: 
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 20px #fff,
      0 0 40px #ff00ff,
      0 0 80px #ff00ff,
      0 0 90px #ff00ff,
      0 0 100px #ff00ff,
      0 0 150px #ff00ff;
  }
  50% {
    text-shadow: 
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 20px #ff00ff,
      0 0 40px #ff00ff,
      0 0 80px #ff00ff,
      0 0 90px #ff00ff,
      0 0 100px #ff00ff,
      0 0 150px #ff00ff;
  }
`;

const NeonHeading = styled(Heading)`
  animation: ${neonGlow} 1.5s ease-in-out infinite alternate;
  color: #ff00ff;
`;

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3500/ml/', {
        Terms: searchQuery,
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching data from API', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <NeonHeading as="h1" fontSize="3xl" marginBottom="20px">Ai Tools</NeonHeading>
      <Input
        id="search"
        type="text"
        placeholder="Type Skill"
        value={searchQuery}
        onChange={handleSearchInputChange}
        width="400px"
        height="50px"
        padding="10px"
        border="2px solid #ff00ff"
        borderRadius="25px"
        fontSize="1.5rem"
        outline="none"
        background="rgba(255, 255, 255, 0.2)"
        color="#000"
        textAlign="center"
        boxShadow="0 0 20px rgba(255, 255, 255, 0.2)"
        transition="all 0.3s ease-in-out"
        _focus={{
          width: '500px',
          background: 'rgba(255, 255, 255, 0.4)',
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.4)',
        }}
      />
      <Button
        marginTop="20px"
        padding="12px 24px"
        fontSize="1.5rem"
        borderRadius="25px"
        background="linear-gradient(135deg, #ff4e50, #f9d423)"
        color="white"
        cursor="pointer"
        boxShadow="0 0 20px rgba(255, 255, 255, 0.2)"
        transition="all 0.3s ease-in-out"
        _hover={{
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.4)',
          background: 'linear-gradient(135deg, #f9d423, #ff4e50)',
        }}
        onClick={handleSearch}
      >
        Get Recommendation
      </Button>
      {loading ? (
        <Spinner size="xl" color="black" marginTop="15px" />
      ) : (
        <Box marginTop="15px">
          {Object.keys(results).length > 0 && (
            <Table width="80%" marginTop="20px" variant="simple" colorScheme="pink">
              <Thead>
                <Tr>
                  <Th>Tool</Th>
                  <Th>Link</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Object.entries(results).map(([tool, link], index) => (
                  <Tr key={index}>
                    <Td>{tool}</Td>
                    <Td>
                      <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchForm;
