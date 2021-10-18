import API from "../shared/axios";
// user routes

// signup
export const signupUser = (newUser) => API.post("/api/user/signup/", newUser);
// activate user account
export const activateAccount = (activation_token) =>
  API.post("/api/user/activate-user-account/", { activation_token });

// resend account activation email
export const resendActivation = (email) =>
  API.post("/api/user/resend-account-activation-link/", { email });

// sign in user
export const signIn = (loginData) => API.post("/api/user/login/", loginData);

// send password reset email
export const resetPassword = (email) =>
  API.post("/api/user/user-request-password-reset/", { email });

// set new password using reset link sent from above
export const setPassword = (newPasswords, password_token) =>
  API.post("/api/user/user-set-new-password/", {
    ...newPasswords,
    password_token,
  });
// user change password
export const changePassword = (passwords, userId) =>
  API.post(`/api/user/change-user-password/${userId}/`, passwords);

// API to add a new title
export const addNewTitle = (userId, body) =>
  API.post(`/api/search/maintain-titles/${userId}/`, body);
