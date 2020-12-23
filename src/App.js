import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignOut,
  AmplifySignUp
} from "@aws-amplify/ui-react";
import { Center, Heading } from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import { SelectMFAType } from "aws-amplify-react";
import { useEffect, useState } from "react";
const MFATypes = {
  SMS: true, // if SMS enabled in your user pool
  TOTP: true, // if TOTP enabled in your user pool
  Optional: true, // if MFA is set to optional in your user pool
};

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    let getUser = async () => {
      let _user = await Auth.currentAuthenticatedUser();
      console.log("User: ", _user);
      setUser(_user);
    };
    getUser();
  }, []);
  return (
    <>
      <AmplifyAuthenticator usernameAlias="email">
        <AmplifySignIn slot="sign-in" usernameAlias="email" />
        <AmplifySignUp
          slot="sign-up"
          usernameAlias="email"
          formFields={[
            {
              type: "given_name",
              label: "First Name",
              placeholder: "Your first name",
              required: true,
            },
            {
              type: "family_name",
              label: "Last Name",
              placeholder: "Your last name",
              required: true,
            },
            {
              type: "email",
              label: "Email address",
              placeholder: "Your email address",
              required: true,
            },
            {
              type: "password",
              label: "Password",
              placeholder: "Your password",
              required: true,
            },
            {
              type: "phone_number",
              label: "Phone",
              placeholder: "Your phone number",
              required: true,
            },
          ]}
        />
      </AmplifyAuthenticator>
      <Center h="100vh" as={Heading}>
        Hello {user?.attributes.given_name}!!!
        <AmplifySignOut />
        <SelectMFAType authData={user} MFATypes={MFATypes} />
      </Center>
    </>
  );
}

export default App;
