import * as actionTypes from "../actions/types";
import { updateObject } from "../utility";

const initialState = {
  titlesList: [],
};

// add a new title
const addNewTitle = (state, payload) => {
  return updateObject(state, {
    titlesList: [...state.titlesList, payload],
  });
};

// staff get all titles
const gettAllTitles = (state, payload) => {
  return updateObject(state, {
    titlesList: payload,
  });
};

const searchReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.NEW_TITLE:
      return addNewTitle(state, payload);
    case actionTypes.SET_TITLES:
      return gettAllTitles(state, payload);
    default:
      return state;
  }
};

export default searchReducer;
