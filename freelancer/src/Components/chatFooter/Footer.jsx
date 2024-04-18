import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

const Footer = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  const handleChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputMessage && inputMessage.trim && inputMessage.trim().length) {
      handleSendMessage();
    }
  };

  return (
    <Flex w="100%" mt="5">
      <Input
        placeholder="Type Something..."
        border="none"
        borderRadius="none"
        _focus={{
          border: "1px solid black",
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e); // Call handleSubmit instead of handleSendMessage directly
          }
        }}
        value={inputMessage}
        onChange={(e) => handleChange(e)}
      />
      <Button
        bg="black"
        color="white"
        borderRadius="none"
        _hover={{
          bg: "white",
          color: "black",
          border: "1px solid black",
        }}
        disabled={!inputMessage || inputMessage.trim().length <= 0}
        onClick={(e) => handleSubmit(e)}
      >
        Send
      </Button>
    </Flex>
  );
};

export default Footer;
