import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:3500/report/allReports');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setReports(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" mt={20} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent>
        <Alert status="error" mt={20}>
          <AlertIcon />
          {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" mt={5}>
      <Heading mb={6}>All Reports</Heading>
      <VStack spacing={5}>
        {reports.map((report) => (
          <Box
            key={report._id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            w="100%"
            bg="white"
          >
            <HStack justify="space-between">
              <Heading fontSize="xl">{report.userName}</Heading>
              <Text>{new Date(report.createdAt).toLocaleDateString()}</Text>
            </HStack>
            <Text mt={4}>{report.message}</Text>
            <Text mt={2} color="gray.500">{report.email}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
}
