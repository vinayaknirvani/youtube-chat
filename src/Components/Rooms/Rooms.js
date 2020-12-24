import {
    Box,
    Button,
    Divider,
    FormControl,
    FormLabel,
    Input,
    List,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { FiHash } from "react-icons/fi";
import apiManager from "../../api/apiManager";
import Actions from "../../store/actions";
import { useStateValue } from "./../../store/stateProvider";
  
  const Rooms = () => {
    const [{ currentRoom, rooms }, dispatch] = useStateValue();
    const { onClose } = useDisclosure();
    const [isOpen, setIsOpen] = useState(false);
    const initialRef = React.useRef();
    const [user, setUser] = useState();
  
    const onOpen = (flag) => {
      if (flag) {
        setIsOpen(true);
      } else {
        setIsOpen(flag);
      }
    };
    useEffect(() => {
      apiManager.getAllRooms(100, null).then((response) => {
        dispatch({
          type: Actions.SetRooms,
          item: response.rooms.sort(
            (x, y) => new Date(y.createdAt) - new Date(x.createdAt)
          ),
        });
      });
    }, [dispatch]);
  
    useEffect(() => {
      if (currentRoom) {
        apiManager.getMessagesByRoom(currentRoom.id, null).then((response) => {
          dispatch({
            type: Actions.SetMessages,
            items: response.messages,
          });
        });
      }
    }, [currentRoom, dispatch]);
    useEffect(() => {
      const getu = async () => {
        let _user = await Auth.currentAuthenticatedUser();
        setUser(_user);
      };
      getu();
    }, []);
    const selectRoom = (room) => {
      dispatch({
        type: Actions.SetCurrentRoom,
        item: room,
      });
    };
  
    const addRoom = () => {
      if (initialRef.current.value) {
        apiManager.addNewRoom(initialRef.current.value, user).then((response) => {
          dispatch({
            type: Actions.AddRoom,
            item: response.room,
          });
          setIsOpen(false);
        });
      } else {
        //   setInValid(true);
        //   setIsOpen(false);
      }
    };
  
    const RoomModal = () => {
      return (
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create new room</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Room name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Room name"
                  errorBorderColor="crimson"
                  isInvalid={!initialRef.current?.value}
                  onKeyPress={(e) => {
                    if (e.charCode === 13) {
                      addRoom();
                    }
                  }}
                />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={() => addRoom()}>
                Add room
              </Button>
              <Button onClick={() => onOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      );
    };
  
    return (
      <Box flex=".2" boxShadow="md" mb="10px" p="5px" pb={5}>
        <Box border="0px solid red" p={1}>
          <Button
            colorScheme="primary"
            variant="outline"
            w="100%"
            onClick={onOpen}
          >
            Add new room
          </Button>
        </Box>
        <Divider mt={5} />
        <Box
          // border="1px solid green"
          overflowY="hidden"
          height="100%"
          mb="10px"
          p="5px"
          pb="50px"
        >
          <List spacing={3}>
            {rooms.map((room, index) => {
              return (
                <ListItem key={index} borderRadius={2}>
                  <Button
                    w="100%"
                    justifyContent="left"
                    leftIcon={<FiHash />}
                    //   borderRadius={0}
                    variant={
                      currentRoom && currentRoom.id === room.id
                        ? "solid"
                        : "ghost"
                    }
                    colorScheme={
                      currentRoom && currentRoom.id === room.id ? "blue" : ""
                    }
                    onClick={() => selectRoom(room)}
                  >
                    {room.name}
                  </Button>
                  <Divider />
                </ListItem>
              );
            })}
          </List>
        </Box>
        <RoomModal />
      </Box>
    );
  };
  
  export default Rooms;
  