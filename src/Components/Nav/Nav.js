import {
    Avatar,
    Button,
    Container,
    Flex,
    IconButton,
    Image,
    Stack,
    Text,
    useColorMode
} from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
  
  const Nav = () => {
    const [user, setUser] = useState(null);
    const { colorMode, toggleColorMode } = useColorMode();
    // const toast = useToast();
  
    useEffect(() => {
      let getUser = async () => {
        let _user = await Auth.currentAuthenticatedUser();
        setUser(_user);
      };
      getUser();
    }, []);
  
    const signOut = async () => {
      try {
        await Auth.signOut();
      } catch (error) {
        console.log("error signing out: ", error);
      }
    };
  
    return (
      <Flex
        position={{ md: "fixed" }}
        minH="6px"
        w="100%"
        marginTop={{ md: "-4rem" }}
        zIndex="99"
        boxShadow="md"
      >
        <Container minW="100%">
          <Flex direction="row" alignItems="center" justifyContent="center">
            <Image
              boxSize="54px"
              src={colorMode === "light" ? "logob.png" : "logo192.png"}
            />
            <Text fontSize="xl" fontWeight="500">
              Chat app
            </Text>
            <Stack style={{ marginLeft: "auto" }}>
              <Stack
                isInline
                alignItems="center"
                justifyContent="center"
                display="flex"
              >
                <IconButton
                  onClick={toggleColorMode}
                  aria-label={colorMode === "light" ? "Dark" : "Light"}
                  icon={colorMode === "light" ? <BsMoon /> : <BsSun />}
                  mr={2}
                  ml={2}
                />
                <Avatar
                  name={
                    user?.attributes.given_name +
                    " " +
                    user?.attributes.family_name
                  }
                  mr={2}
                />
                <Button onClick={signOut} rightIcon={<FiLogOut />}>
                  Sign out
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </Container>
      </Flex>
    );
  };
  export default Nav;
  