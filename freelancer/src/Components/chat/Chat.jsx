// Chat.jsx
import { Flex, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import Divider from "../divider/Divider";
import Footer from "../chatFooter/Footer";
import Header from "../chatHeader/Header";
import Messages from "../messages/Messages";
import SidePanel from "../sidePanel/SidePanel"; // Adjust the import path

const Chat = () => {
    const [conversations, setConversations] = useState([
      {
        participant: "John",
        avatar: "url_to_john_image.jpg", 
        messages: [
          { from: "John", text: "Hello" },
          { from: "me", text: "Hi John" },
        ],
      },
      {
        participant: "Ahmed",
        avatar: "url_to_alice_image.jpg", 
        messages: [
          { from: "Ahmed", text: "Hey there" },
          { from: "me", text: "Hi Ahmed" },
        ],
      },
      
    ]);
  
    const [activeChatIndex, setActiveChatIndex] = useState(0);
  
    const handleSendMessage = (message) => {
      if (!message.trim().length) {
        return;
      }
  
      const updatedConversations = [...conversations];
      updatedConversations[activeChatIndex].messages.push({
        from: "me",
        text: message,
      });
  
      setConversations(updatedConversations);
  
      setTimeout(() => {
        updatedConversations[activeChatIndex].messages.push({
          from: updatedConversations[activeChatIndex].participant,
          text: message,
        });
        setConversations(updatedConversations);
      }, 1000);
    };
  
    return (
        <Flex w="90%" h="90vh" justify="center" align="center">
          <Flex w={["100%", "100%", "90%"]} h="90%" flexDir="row">
            {/* SidePanel component */}
            <SidePanel
              conversations={conversations}
              setActiveChatIndex={setActiveChatIndex}
            />
            {/* Main chat area */}
            <Box w="70%" h="100%">
              <Header />
              <Divider />
              <Messages
                messages={conversations[activeChatIndex].messages}
              />
              <Divider />
              <Footer
                handleSendMessage={(message) => handleSendMessage(message)}
              />
            </Box>
          </Flex>
        </Flex>
      );
    };
    
    export default Chat;