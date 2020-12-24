import {
    Box,
    Center,
    Flex,
    IconButton,
    Input,
    List,
    Text,
    useColorMode
} from "@chakra-ui/react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import React, { useEffect, useRef, useState } from "react";
import { BiSend } from "react-icons/bi";
import apiManager from "../../api/apiManager";
import { onMessageCreated } from "../../graphql/subscriptions";
import Actions from "../../store/actions";
import Message from "../Message/Message";
import { useStateValue } from "./../../store/stateProvider";

const Chat = () => {
  const [{ messages, currentRoom }, dispatch] = useStateValue();
  const { colorMode } = useColorMode();
  const refText = useRef();
  const divRef = useRef();
  const [user, setUser] = useState();
  let subscription;

  const scrollToBottom = () => {
    divRef.current?.scrollIntoView({
      block: "end",
      inline: "nearest",
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const getu = async () => {
      let _user = await Auth.currentAuthenticatedUser();
      setUser(_user);
    };
    getu();
  }, []);

  function setupSubscription() {
    subscription = API.graphql(
      graphqlOperation(onMessageCreated, { roomId: currentRoom?.id })
    ).subscribe({
      next: (newMessage) => {
          console.log("new message: ", newMessage);
        if (newMessage.value.data.onMessageCreated.owner !== user.username) {
          dispatch({
            type: Actions.AddMessage,
            item: newMessage.value.data.onMessageCreated,
          });
        }
      },
    });
  }
  useEffect(() => {
    if (currentRoom) {
      setupSubscription();
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [currentRoom]);

  const addMessage = async () => {
    if (refText.current.value) {
      let _user = await Auth.currentAuthenticatedUser();
      apiManager
        .addMessage(currentRoom.id, refText.current.value, _user)
        .then((response) => {
          dispatch({
            type: Actions.AddMessage,
            item: response.message,
          });
          //   setMessage("");
          refText.current.value = "";
          scrollToBottom();
        });
    }
  };
  return (
    <Box
      flex="1"
      p={4}
      bgImage={
        colorMode === "light"
          ? "url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)"
          : "url(https://i.redd.it/ts7vuoswhwf41.jpg)"
      }
      overflowY="scroll"
    >
      {currentRoom ? (
        <Flex flexDirection="column" height="100%" width="100%">
          <Box flex={1.5} overflowY="scroll" mb={5}>
            <List spacing={3} ref={divRef}>
              {messages
                .sort((x, y) => new Date(x.createdAt) - new Date(y.createdAt))
                .map((message) => {
                  return <Message key={message.id} message={message} />;
                })}
            </List>
          </Box>
          <Box
            flex={0.1}
            borderTop="1px solid red"
            pt={3}
            pb={3}
            bgColor={colorMode === "light" ? "white" : "#262d31"}
          >
            <Flex
              width="100%"
              justifyContent="center"
              alignItems="center"
              pl={5}
              pr={5}
            >
              <Input
                placeholder="Type a message"
                flex={1}
                size="lg"
                ref={refText}
                onKeyPress={(e) => {
                  if (e.charCode === 13 && refText.current.value) {
                    addMessage();
                  }
                }}
              />
              <IconButton
                aria-label="Send a message"
                icon={<BiSend />}
                variant="outline"
                flex={0.1}
                ml={2}
                onClick={addMessage}
              />
            </Flex>
          </Box>
        </Flex>
      ) : (
        <Center height="100%">
          <Flex flexDirection="column" alignItems="center">
            <Text fontSize="3xl">Looking for messages???</Text>
            <Text fontSize="sm">Select room from the list.</Text>
          </Flex>
        </Center>
      )}
    </Box>
  );
};

export default Chat;
