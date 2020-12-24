/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onMessageCreated = /* GraphQL */ `
  subscription OnMessageCreated($roomId: ID!) {
    onMessageCreated(roomId: $roomId) {
      id
      roomId
      message
      senderName
      createdAt
      owner
      room {
        id
        name
        createdAt
        owner
        messages {
          nextToken
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom {
    onCreateRoom {
      id
      name
      createdAt
      owner
      messages {
        items {
          id
          roomId
          message
          senderName
          createdAt
          owner
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom {
    onUpdateRoom {
      id
      name
      createdAt
      owner
      messages {
        items {
          id
          roomId
          message
          senderName
          createdAt
          owner
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom {
    onDeleteRoom {
      id
      name
      createdAt
      owner
      messages {
        items {
          id
          roomId
          message
          senderName
          createdAt
          owner
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      roomId
      message
      senderName
      createdAt
      owner
      room {
        id
        name
        createdAt
        owner
        messages {
          nextToken
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      roomId
      message
      senderName
      createdAt
      owner
      room {
        id
        name
        createdAt
        owner
        messages {
          nextToken
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      roomId
      message
      senderName
      createdAt
      owner
      room {
        id
        name
        createdAt
        owner
        messages {
          nextToken
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
