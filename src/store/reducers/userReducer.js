import {
  ADD_USER,
  CONNECT_USER,
  DISCONNECT_USER,
  LOGIN_USER,
  REMOVE_MESSAGE,
  SET_CURRENT_USER,
  SET_MESSAGE,
  SET_SCOREBOARD,
  UPDATE_SCORE
} from '../constants';

const initialState = {
  connected: false,
  loggedIn: false,
  message: '',
  scoreboard: false,
  users: [],
  currentUser: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case CONNECT_USER:
      return {
        ...state,
        connected: true
      };
    case DISCONNECT_USER:
      return {
        ...state,
        connected: false
      };
    case LOGIN_USER:
      return {
        ...state,
        loggedIn: true
      };
    case REMOVE_MESSAGE:
      return {
        ...state,
        message: ''
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
    case SET_SCOREBOARD:
      return {
        ...state,
        scoreboard: true
      };
    case UPDATE_SCORE:
      const updatedUsers = state.users.map(user => {
        if (user.id === action.payload) {
          user.score += 1;
        }
        return user;
      });
      return {
        ...state,
        users: updatedUsers
      };
    default:
      return state;
  }
};
