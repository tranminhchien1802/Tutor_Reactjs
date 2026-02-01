import { post, get } from "../Utils/request";

const Login = async (email, password) => {
  return await post("login", {
    email: email,
    password: password,
  });
};
// Register
const Register = async (options) => {
  return await post("register", options);
};
// Forgot Password
const ForgotPassword = async (email) => {
  return await post("forgot-password", { email });
};
// Verify Reset
const VerifyReset = async (email, resetToken) => {
  return await post("verify-Reset", { email, resetToken });
};
// update password
const updatePassword = async (oldPassword, newPassword) => {
  return await post("updatepassword", { oldPassword, newPassword }, true);
};
// get profile
const getProfile = async () => {
  return await get("profile", true);
};
// update profile
const updateProfile = async (options) => {
  return await post("profile/edit", options, true);
};
export {
  Login,
  Register,
  ForgotPassword,
  VerifyReset,
  updatePassword,
  getProfile,
  updateProfile,
};
