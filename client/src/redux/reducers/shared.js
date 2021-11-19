import {
  START_LOADING,
  STOP_LOADING,
} from "../actions/types";

export const sharedInitialState = {
  loading: false,
};

const sharedReducer = (state = sharedInitialState, action) => {
  const { type } = action;

  switch (type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default sharedReducer;
