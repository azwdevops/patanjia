import * as api from "../../api";
import * as actionTypes from "./types";
import { showError, stopLoading } from "./shared";

// add a new title
export const add_new_title = (userId, body, resetForm) => async (dispatch) => {
  await api
    .addNewTitle(userId, body)
    .then((res) => {
      dispatch({ type: actionTypes.NEW_TITLE, payload: res.data?.new_title });
      window.alert(res.data?.detail);
      resetForm();
    })
    .catch((err) => showError(err))
    .finally(() => stopLoading(dispatch));
};

// get all titles for staff
export const get_all_titles = (userId) => async (dispatch) => {
  await api
    .getAllTitles(userId)
    .then((res) => {
      dispatch({
        type: actionTypes.SET_TITLES,
        payload: res.data?.titles_data,
      });
    })
    .catch((err) => showError(err))
    .finally(() => stopLoading(dispatch));
};
