import { Avatar, Flex, ListItem, Text, useColorMode } from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";

const Message = ({ message }) => {
  const { colorMode } = useColorMode();

  const [user, setUser] = useState();

  useEffect(() => {
    const getu = async () => {
      let _user = await Auth.currentAuthenticatedUser();
      setUser(_user);
    };
    getu();
  }, []);

  return (
    <ListItem
      p={3}
      boxShadow="md"
      bgColor={colorMode === "light" ? "white" : "#1A202C"}
      borderRadius={6}
      width="50%"
      marginLeft={user?.username === message?.owner ? "auto" : "0"}
    >
      <Flex>
        <Avatar name={message.senderName} />
        <Flex
          flexDirection="column"
          width="100%"
          ml={2}
          justifyContent="space-between"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontSize="lg">{message.message}</Text>
            <Text fontSize="xs">
              {new Date(message.createdAt).toLocaleString()}
            </Text>
          </Flex>
          <Text colorScheme="blue" fontSize="xs">
            {message.senderName}
          </Text>
        </Flex>
      </Flex>
    </ListItem>
  );
};

export default Message;
