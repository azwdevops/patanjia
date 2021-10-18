import API from "../shared/axios";

// get user data
export const getUser = () => API.get("/api/user/get-user-data/");

// get all titles
export const getAllTitles = (userId) =>
  API.get(`/api/search/maintain-titles/${userId}/`);
