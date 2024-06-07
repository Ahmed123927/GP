import React, { useEffect, useState, useCallback } from 'react';
import { 
  Flex, Box, Input, Button, Text, extendTheme, ChakraProvider, 
  useColorMode, Heading, VStack, Image, Center, IconButton 
} from '@chakra-ui/react';
import { FaFileUpload, FaImage } from 'react-icons/fa';
import axios from 'axios';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.100',
        color: 'gray.800',
      },
    },
  },
});

export default function Chating() {
  const { colorMode } = useColorMode();
  const [users, setUsers] = useState([]);
  const userId = localStorage.getItem('userId');
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  const getChatById = useCallback(async (chatId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get(`http://localhost:3500/message/chat/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSelectedChat(response.data);
    } catch (error) {
      console.error('Error fetching chat:', error);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get(`http://localhost:3500/message/${userId}/chats`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const users = [];
        response.data.forEach(conversation => {
          const filteredParticipants = conversation.participants.filter(participant => participant._id !== userId);
          const participantData = filteredParticipants.map(participant => ({
            chatId: conversation._id,
            img: participant.img ? participant.img.secure_url : '',
            userName: participant.userName
          }));
          users.push(...participantData);
        });

        setUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [userId]);

  const handleChatClick = (chatId) => {
    getChatById(chatId);
  };

  const handleSendMessage = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const tempMessage = {
        senderId: userId,
        message: messageInput,
        createdAt: new Date().toISOString()
      };
      setSelectedChat(prevState => ({
        ...prevState,
        messages: [...prevState.messages, tempMessage]
      }));
      setMessageInput('');

      await axios.post(
        `http://localhost:3500/message/send/${selectedChat.participants.find(participant => participant._id !== userId)._id}`,
        { message: messageInput },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const updatedChat = await axios.get(`http://localhost:3500/message/chat/${selectedChat._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSelectedChat(updatedChat.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const getParticipantName = useCallback((senderId) => {
    if (selectedChat && selectedChat.participants && selectedChat.participants.length > 0) {
      const participant = selectedChat.participants.find(participant => participant._id === senderId);
      return participant ? participant.userName : 'Unknown';
    }
    return 'Unknown';
  }, [selectedChat]);

  return (
    <ChakraProvider theme={theme}>
      <main>
        <Flex direction="column" align="center" justify="center" py={8}>
          <Flex width="80%" maxWidth="1200px">
            <Box flex="1" mr={[0, 0, 4]} mb={[4, 4, 0]} boxShadow="lg" rounded="md" bg="white" p={4}>
              <Input 
                type="text" 
                placeholder="Search..." 
                mb={3} 
                bg="gray.200" 
                border="none" 
                borderRadius="md" 
                p={2} 
                color="black"
              />
              <Box overflowY="auto" maxHeight="600px">
                {users.map((user, index) => (
                  <Box 
                    key={index} 
                    p={3} 
                    borderBottomWidth="1px" 
                    borderColor="gray.200" 
                    display="flex" 
                    alignItems="center" 
                    onClick={() => handleChatClick(user.chatId)}
                    _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
                  >
                    <Image 
                      src={user.img} 
                      alt={user.userName} 
                      boxSize="40px" 
                      borderRadius="full" 
                      marginRight="16px"
                    />
                    <Text color="gray.800">{user.userName}</Text>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box flex="2" boxShadow="lg" rounded="md" bg="white" p={4}>
              {selectedChat ? (
                <>
                  <Box borderBottomWidth="1px" borderColor="gray.200" p={3} mb={4}>
                    {selectedChat.participants && selectedChat.participants.length > 0 && (
                      <Flex align="center">
                        {selectedChat.participants.map((participant, index) => (
                          participant._id !== userId && (
                            <Flex key={index} align="center">
                              <Image 
                                src={participant.img.secure_url} 
                                alt={participant.userName} 
                                boxSize="40px" 
                                borderRadius="full" 
                                marginRight="8px"
                              />
                              <Text pl={2} fontWeight="bold" color="gray.800">{participant.userName}</Text>
                            </Flex>
                          )
                        ))}
                      </Flex>
                    )}
                  </Box>
                  <Box p={4} className="chat-messages" maxHeight="400px" overflowY="auto">
                    {selectedChat.messages && selectedChat.messages.map((message, index) => (
                      <Box 
                        key={index} 
                        className={`chat-message-${message.senderId === userId ? 'left' : 'right'}`} 
                        pb={4}
                        _hover={{ '.timestamp': { display: 'block' }}}
                      >
                        <Flex justify={message.senderId === userId ? 'flex-start' : 'flex-end'}>
                          <Box bg={message.senderId === userId ? 'blue.500' : 'green.500'} rounded="md" py={2} px={3} maxWidth="70%">
                            <Text fontWeight="bold" mb={1} color="white">{message.senderId === userId ? 'You' : getParticipantName(message.senderId)}</Text>
                            <Text color="white">{message.message}</Text>
                            <Text className="timestamp" fontSize="xs" color="gray.300" mt={2} textAlign="right" display="none">{new Date(message.createdAt).toLocaleString()}</Text>
                          </Box>
                        </Flex>
                      </Box>
                    ))}
                  </Box>
                  <Box borderTopWidth="1px" borderColor="gray.200" py={3} px={4}>
                    <Flex>
                      <Input 
                        type="text" 
                        placeholder="Type your message" 
                        value={messageInput} 
                        onChange={(e) => setMessageInput(e.target.value)} 
                        bg="gray.200" 
                        border="none" 
                        borderRadius="md" 
                        p={2} 
                        color="black"
                      />
                      <Input 
                        type="file" 
                        display="none" 
                        id="file-upload" 
                      />
                      <Input 
                        type="file" 
                        accept="image/*" 
                        display="none" 
                        id="image-upload" 
                      />
                      <IconButton 
                        as="label" 
                        htmlFor="file-upload" 
                        icon={<FaFileUpload />} 
                        ml={2} 
                        colorScheme="teal" 
                        aria-label="Upload File"
                      />
                      <IconButton 
                        as="label" 
                        htmlFor="image-upload" 
                        icon={<FaImage />} 
                        ml={2} 
                        colorScheme="purple" 
                        aria-label="Upload Image"
                      />
                      <Button ml={2} colorScheme="blue" onClick={handleSendMessage}>Send</Button>
                    </Flex>
                  </Box>
                </>
              ) : (
                <Center height="100%">
                  <VStack spacing={4}>
                    <Image src="\img\exp p.png" alt="Select a chat" boxSize="150px" />
                    <Text fontSize="lg" color="gray.600">Select a chat to start messaging</Text>
                  </VStack>
                </Center>
              )}
            </Box>
          </Flex>
        </Flex>
      </main>
    </ChakraProvider>
  );
}
