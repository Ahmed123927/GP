// SidePanel.jsx
import React from "react";
import { Box, Text, VStack, Avatar } from "@chakra-ui/react";

const SidePanel = ({ conversations, setActiveChatIndex }) => {
  return (
    <Box w="30%" h="100%" borderRight="1px solid #e0e0e0" padding="4">
      <VStack align="start" spacing="4">
        <Text fontSize="lg" fontWeight="bold">
          Chats
        </Text>
        {conversations.map((conversation, index) => (
          <Box
            key={index}
            cursor="pointer"
            onClick={() => setActiveChatIndex(index)}
            width="100%"
            padding="2"
            borderBottom="1px solid #e0e0e0"
            display="flex"
            alignItems="center"
          >
            <Avatar src={conversation.avatar} name={conversation.participant} />
            <VStack align="start" spacing="1" ml="4">
              <Text fontWeight="bold">{conversation.participant}</Text>
              <Text fontSize="sm" color="gray.500">
                {conversation.messages.length > 0
                  ? conversation.messages[conversation.messages.length - 1].text
                  : ""}
              </Text>
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default SidePanel;
