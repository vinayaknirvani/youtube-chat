import { Flex } from "@chakra-ui/react";
import React from "react";
import { Chat, Nav, Rooms } from "./../Components";

const Home = () => {
  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="top"
      flexDirection="column"
      paddingTop={{ md: "4rem" }}
    >
      <Nav />
      <Flex minW="100%" title="Live Chat App" height="94vh" overflow="hidden">
          <Rooms/>
          <Chat/>
      </Flex>
    </Flex>
  );
};

export default Home;
