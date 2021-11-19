import { STOP_LOADING } from "./types";


// START OF reusable functions
// show error function
export const showError = (err) => {
  if (
    err?.response?.status === 400 ||
    err?.response?.status === 401 ||
    err?.response?.status === 403
  ) {
    window.alert(err?.response?.data?.detail);
  } else {
    window.alert("An unknown error occurred");
  }
};
export const stopLoading = (dispatch) => {
  dispatch({ type: STOP_LOADING });
};
