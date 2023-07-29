import * as HTTPResponseUtil from "../../utils/httpResponseUtils";
import * as userService from "../services/user.service";
import * as userInterface from "../../interfaces/user.interface";

export const register = async (registrationRequest: userInterface.User) => {
  console.log(`UserController : register :: User ${registrationRequest.username}`);

  const userRegister = await userService.register(registrationRequest);

  console.log(`UserController : register :: Ack ${registrationRequest.username}`);

  return userRegister
};

export const login = async (userLoginRequest: userInterface.LoginRequest) => {
  console.log(`UserController : login :: User ${userLoginRequest.username}`);

  const userLogin = await userService.login(userLoginRequest);

  console.log(`UserController : login :: Ack ${userLoginRequest.username}`);

  return userLogin;
};

export const getUsers = async (user: userInterface.User) => {
  console.log(`UserController : getUsers :: User ${user.username}`);

  const userLogin = await userService.getAllUsers(user.username);

  console.log(`UserController : getUsers :: Ack ${user.username}`);

  return userLogin;
};
