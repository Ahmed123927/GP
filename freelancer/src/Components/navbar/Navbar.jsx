import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useColorMode,
  useDisclosure,
  useColorModeValue,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        const role = localStorage.getItem('role'); // Fetch role from localStorage
        let response;
  
        if (role === 'freelancer') {
          response = await axios.get('http://localhost:3500/user', {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });
        } else {
          response = await axios.get('http://localhost:3500/client', {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });
        }
  
        setCurrentUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data. Please try again.');
      }
    };
  
    fetchUserData();
  }, []);
  
  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3500/auth/logout');
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userId');
      window.location.reload();

      setCurrentUser(null); // Clear currentUser state
    } catch (error) {
      console.error('Logout failed:', error);
      setError('Logout failed. Please try again.');
    }
  };

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Link to="/">
              <Text fontSize="xl" fontWeight="bold">
                +EXP
              </Text>
            </Link>
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={currentUser && currentUser.img ? currentUser.img.secure_url : 'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={currentUser && currentUser.img ? currentUser.img.secure_url : 'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{currentUser?.userName || 'Username'}</p>
                  </Center>
                  <br />
                  <Center>
                    <p>{currentUser?.CompanyName || 'Company Name'}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuList>
                    <MenuItem as={Link} to="/profile">
                      Profile
                    </MenuItem>
                    <MenuItem as={Link} to="/chat">
                      Messages
                    </MenuItem>
                    <MenuItem onClick={handleLogout} as={Link} to="/">
                      Logout
                    </MenuItem>
                  </MenuList>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
