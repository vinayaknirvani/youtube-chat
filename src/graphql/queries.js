/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRoom = /* GraphQL */ `
  query GetRoom($id: ID!) {
    getRoom(id: $id) {
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
export const listRooms = /* GraphQL */ `
  query ListRooms(
    $filter: ModelRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        owner
        messages {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const listMessagesByRoom = /* GraphQL */ `
  query ListMessagesByRoom(
    $roomId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessagesByRoom(
      roomId: $roomId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchRooms = /* GraphQL */ `
  query SearchRooms(
    $filter: SearchableRoomFilterInput
    $sort: SearchableRoomSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchRooms(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        createdAt
        owner
        messages {
          nextToken
        }
        updatedAt
      }
      nextToken
      total
    }
  }
`;
