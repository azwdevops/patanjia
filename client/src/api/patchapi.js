import API from "../shared/axios";

// patch user data
export const updateUser = (updatedUser, userId) =>
  API.patch(`/api/user/update-user-details/${userId}/`, updatedUser);
