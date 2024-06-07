import React, { useEffect, useState } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Box, Flex, Input, Heading, Text, VStack, HStack, Divider
} from '@chakra-ui/react';
import axios from 'axios';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get('http://localhost:3500/admin/allUsers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const filteredUsers = response.data.filter(user => user.role !== 'admin');
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    onOpen();
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.delete('http://localhost:3500/admin/delete', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          id: selectedUserId
        }
      });
      setUsers(users.filter(user => user._id !== selectedUserId));
      onClose();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get(`http://localhost:3500/admin/${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers([response.data]); // Assuming the response is a single user object
    } catch (error) {
      console.error('Error searching user:', error);
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    fetchUsers();
  };

  return (
    <Box p={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">User Management</Heading>
        <Text fontSize="lg" textAlign="center">
          Use the search bar below to find a user by their username. You can also reset to see the full list of users.
        </Text>
        <Divider />
        <HStack spacing={4} justify="center">
          <Input
            placeholder="Search by username"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="md"
            width="300px"
          />
          <Button onClick={handleSearch} colorScheme="teal">Search</Button>
          <Button onClick={handleReset} colorScheme="gray">Reset</Button>
        </HStack>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <TableCaption placement="top">Users List</TableCaption>
            <Thead>
              <Tr>
                <Th>Username</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(user => (
                <Tr key={user._id}>
                  <Td>{user.userName}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    <Button colorScheme="red" onClick={() => handleDeleteClick(user._id)}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this user? This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleConfirmDelete}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
