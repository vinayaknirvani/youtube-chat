import Actions from "./actions";

function reducer(state, action) {
  switch (action.type) {
    case Actions.SetCurrentRoom:
      return { ...state, currentRoom: action.item };
    case Actions.SetRooms:
      return { ...state, rooms: action.item, currentRoom: null };
    case Actions.SetMessages:
      return { ...state, messages: action.items };
    case Actions.AddMessage:
      return { ...state, messages: [...state.messages, action.item] };
    case Actions.AddRoom:
      return {
        ...state,
        rooms: [action.item, ...state.rooms],
        currentRoom: action.item,
      };
    default:
      return state;
  }
}

export default reducer;
