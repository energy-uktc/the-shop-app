import { SIGNUP, LOGIN } from "../actions/auth";

const initialState = {
  email: "",
  idToken: "",
  userId: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        email: action.email,
        idToken: action.idToken,
        userId: action.userId
      };
    case LOGIN:
      return {
        email: action.email,
        idToken: action.idToken,
        userId: action.userId
      };
    default:
      return state;
  }
};
