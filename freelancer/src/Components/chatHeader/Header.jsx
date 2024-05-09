import React from "react";
import { Flex, Avatar, AvatarBadge, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex w="100%">
      <Avatar size="lg" name="Dan Abrahmov" src="https://bit.ly/dan-abramov">
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
          Ahmed Hussein
        </Text>
      </Flex>
    </Flex>
  );
};

export default Header;
