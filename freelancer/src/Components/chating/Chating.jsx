import React, { useEffect, useState, useCallback } from 'react';
import { Flex, Box, Input, Button, Text, extendTheme, ChakraProvider, useColorMode } from '@chakra-ui/react';
import axios from 'axios';
import { Tooltip } from '@chakra-ui/react';

const theme = extendTheme({
    styles: {
      body: {
        bg: 'gray.200', // Updated background color for light mode
        color: 'black' // Updated text color for light mode
      },
      '.chat-messages': {
        maxHeight: '100x', // Set specific height for chat messages
        overflowY: 'scroll'
      },
      '.chat-message-left, .chat-message-right': {
        display: 'flex',
        flexShrink: 0,
        position: 'relative' // Added position relative for timestamp positioning
      },
      '.chat-message-left': {
        justifyContent: 'flex-start' // Align messages to the left
      },
      '.chat-message-right': {
        justifyContent: 'flex-end' // Align messages to the right
      },
      '.timestamp-full': {
        display: 'none',
        position: 'absolute',
        top: '-25px', // Adjust as needed
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'white',
        padding: '4px',
        borderRadius: '4px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
      },
      '.timestamp:hover .timestamp-full': {
        display: 'block'
      }
    }
  });
  

export default function Chating() {
  const { colorMode } = useColorMode();
  const [users, setUsers] = useState([]);
  const userId = localStorage.getItem('userId');
  const [selectedChat, setSelectedChat] = useState({
    participants: [],
    messages: []
  });
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

      const response = await axios.post(
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
          <Flex width="800px">
            <Box flex="1" mr={[0, 0, 4]} mb={[4, 4, 0]} boxShadow="lg" rounded="md">
              <Input type="text" placeholder="Search..." mb={3} bg="gray.200" border="none" borderRadius="md" p={2} color="black" />
              <Box overflowY="auto">
                {users.map((user, index) => (
                  <Box key={index} as="a" href="#" p={3} borderBottomWidth="1px" borderColor="gray.700" display="flex" alignItems="center" onClick={() => handleChatClick(user.chatId)}>
                    <img src={user.img} alt={user.userName} width={40} height={40} className="rounded-circle mr-2" />
                    <Text color="gray.700">{user.userName}</Text>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box flex="2" boxShadow="lg" rounded="md">
              <Box borderBottomWidth="1px" borderColor="gray.700" p={3}>
                {selectedChat && selectedChat.participants && selectedChat.participants.length > 0 && (
                  <Flex align="center">
                    {selectedChat.participants.map((participant, index) => (
                      participant._id !== userId && (
                        <React.Fragment key={index}>
                          <Box>
                            <img src={participant.img.secure_url} alt={participant.userName} width={40} height={40} className="rounded-circle mr-2" />
                          </Box>
                          <Text pl={2} fontWeight="bold" color="gray.700">{participant.userName}</Text>
                        </React.Fragment>
                      )
                    ))}
                  </Flex>
                )}
              </Box>
              <Box p={4} className="chat-messages">
  {selectedChat && selectedChat.messages && selectedChat.messages.map((message, index) => (
    <Box key={index} className={`chat-message-${message.senderId === userId ? 'left' : 'right'} pb-4`}>
      <Flex justify={message.senderId === userId ? 'flex-start' : 'flex-end'}>
        <Box>
          <Text fontSize="sm" color="gray.500" mt={2} className="timestamp">
            
           
          </Text>
        </Box>
        <Box bg={message.senderId === userId ? 'blue.300' : 'green.300'} rounded="md" py={2} px={3} ml={3}>
          <Text fontWeight="bold" mb={1} color="white">{message.senderId === userId ? 'You' : getParticipantName(message.senderId)}</Text>
          <Text color="white">{message.message}</Text>
          <span className="timestamp-full">{new Date(message.createdAt).toLocaleString()}</span>
        </Box>
      </Flex>
    </Box>
  ))}
</Box>


              <Box borderTopWidth="1px" borderColor="gray.700" py={3} px={4}>
                <Flex>
                  <Input type="text" placeholder="Type your message" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} bg="gray.200" border="none" borderRadius="md" p={2} color="black" />
                  <Button ml={2} colorScheme="blue" onClick={handleSendMessage}>Send</Button>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </main>
    </ChakraProvider>
  );
}
