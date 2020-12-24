import { API, graphqlOperation } from "aws-amplify";
import { createMessage, createRoom } from "../graphql/mutations";
import { listMessagesByRoom } from "./../graphql/queries";
import { listRoomsOnly } from "./myQueries";

const getAllRooms = (limit, nextToken) => {
  return new Promise(function(resolve, _reject) {
    try {
      API.graphql(
        graphqlOperation(listRoomsOnly, {
          limit: limit,
          nextToken: nextToken,
        })
      ).then((response) => {
        resolve({
          rooms: response.data.listRooms.items,
          nextToken: response.data.listRooms.nextToken,
        });
      });
    } catch (error) {
      console.log("error: ", error);
      resolve({ rooms: null, error: error });
    }
  });
};
const addNewRoom = (roomName, user) => {
  return new Promise(function(resolve, _reject) {
    try {
      API.graphql(
        graphqlOperation(createRoom, {
          input: {
            name: roomName,
            owner: user.username,
          },
        })
      )
        .then((response) => {
          // console.log('response from create comment: ', response);
          resolve({ room: response.data.createRoom });
        })
        .catch((error) => {
          resolve({ room: null, error: error });
        });
    } catch (error) {
      console.log("Error; ", error);
      resolve({ room: null, error: error });
    }
  });
};
const getMessagesByRoom = (roomId, nextToken) => {
  return new Promise(function(resolve, _reject) {
    try {
      API.graphql(
        graphqlOperation(listMessagesByRoom, {
          roomId: roomId,
          limit: 100,
          nextToken: nextToken,
        })
      ).then((response) => {
        resolve({
          messages: response.data.listMessagesByRoom.items,
          nextToken: response.data.listMessagesByRoom.nextToken,
        });
      });
    } catch (error) {
      console.log("error: ", error);
      resolve({ messages: null, error: error });
    }
  });
};
const addMessage = (roomId, message, user) => {
  return new Promise(function(resolve, _reject) {
    try {
      API.graphql(
        graphqlOperation(createMessage, {
          input: {
            roomId: roomId,
            message: message,
            senderName: `${user.attributes.given_name} ${
              user.attributes.family_name
            }`,
            owner: user.username,
          },
        })
      ).then((response) => {
        resolve({ message: response.data.createMessage });
      });
    } catch (error) {
      resolve({ error: error });
    }
  });
};

const apiManager = {
  getAllRooms,
  addNewRoom,
  getMessagesByRoom,
  addMessage,
};

export default apiManager;
