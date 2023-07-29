import * as userInterface from "../../interfaces/user.interface";
import * as HTTPResponseUtils from "../../utils/httpResponseUtils";
import * as userDB from "../../utils/Database/user.database";
import * as registerUser from "../../utils/createIdentity/registerUser";
import * as db from "../../utils/Database/dbClient";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as constants from "../../utils/constants";
import { registerWallet } from "../services/wallet.service";

export const register = async (registrationDetails: userInterface.User) => {
  console.log(
    `UserService : register :: Validating user details ${registrationDetails.username}`
  );
  try {
    const validatePasswordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!validatePasswordRegex.test(registrationDetails.password)) {
      return HTTPResponseUtils.internalServerErrorResponse(
        "Password Should contain a minimum of 8 chars, one special char, one smallcase letter, one caps and one digit."
      );
    }

    const dbClient = await db.getDBClient();

    const getUserResponse = await userDB.getUser(
      dbClient,
      registrationDetails.username
    );

    if (getUserResponse.length === 0) {
      const validateEmailRegex =
        /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;

      if (!validateEmailRegex.test(registrationDetails.email)) {
        return HTTPResponseUtils.internalServerErrorResponse(
          "Invalid Email Format!"
        );
      }

      const salt = await bcrypt.genSalt(6);
      const hashedPassword = await bcrypt.hash(
        registrationDetails.password,
        salt
      );

      console.log(
        `UserService : register :: Registering user ${registrationDetails.username}`
      );

      const registerUserWithCA = await registerUser.registerAndEnrollUser(
        registrationDetails.username,
        "",
        "user"
      );

      if (registerUserWithCA.statusCode === 200) {
        console.log(
          `UserService : register :: Registering user wallet ${registrationDetails.username}`
        );

        // Resgiter user wallet
        const userWallet = await registerWallet(registrationDetails.username);

        if (!userWallet) {
          throw new Error("error occurred while registering user wallet");
        }

        console.log(
          `UserService : register :: Registered user wallet ${registrationDetails.username} by address ${userWallet.address}`
        );

        const maxUserId = await userDB.getMaxUserID(dbClient);

        let userId = 0;

        userId = maxUserId.userId === null ? 1 : maxUserId.userId + 1;

        await userDB.registerUser(
          dbClient,
          userId.toString(),
          registrationDetails.username,
          registrationDetails.email,
          hashedPassword,
          userWallet.address
        );

        console.log(
          `UserService : register :: Registered user successfully ${registrationDetails.username}`
        );
      } else {
        console.log(
          `UserService : register :: Error occurred while registering user ${registrationDetails.username}: ${registerUserWithCA}`
        );
      }

      return registerUserWithCA;
    } else {
      return HTTPResponseUtils.internalServerErrorResponse(
        "User with given username or email is already registered."
      );
    }
  } catch (err) {
    console.log(
      `UserService : register :: Failed to register user with Error: ${err}`
    );

    return HTTPResponseUtils.internalServerErrorResponse(
      "Failed to register user"
    );
  }
};

export const login = async (userLoginInfo: userInterface.LoginRequest) => {
  try {
    console.log(
      `UserService : login :: User login service for ${userLoginInfo.username}`
    );

    const dbClient = await db.getDBClient();

    const user = await userDB.getUser(dbClient, userLoginInfo.username);

    if (user.length === 0) {
      return await HTTPResponseUtils.badRequest("Invalid username or password");
    }

    const userObj: userInterface.User = {
      id: user.id.toString(),
      username: user.username,
      password: user.password,
      email: user.email
    };

    const passwordMatched = await bcrypt.compare(
      userLoginInfo.password,
      userObj.password
    );

    if (!passwordMatched) {
      return await HTTPResponseUtils.badRequest("Invalid username or password");
    }

    const userInfo: userInterface.UserResponse = {
      username: userObj.username
    };

    const token = jwt.sign(userInfo, constants.JWT_KEY, {
      expiresIn: constants.JWT_EXPIRATION,
    });

    console.log(`UserService : login :: User ${userObj.username} is logged in`);

    return await HTTPResponseUtils.okResponse({
      token,
      userInfo,
    });
  } catch (err) {
    console.log(`UserService : login :: Error while login due to  ${err}`);

    return HTTPResponseUtils.internalServerErrorResponse(
      "Error while logging in!"
    );
  }
};

export const getUser = async (username: string) => {
  try {
    console.log(
      `UserService : getUser :: Fetching user details for ${username}`
    );

    const dbClient = await db.getDBClient();

    const user = await userDB.getUser(dbClient, username);

    if (user.length === 0) {
      return null;
    }

    const userObj: userInterface.UserDetails = {
      userId: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      walletAddress: user.wallet_address
    };

    console.log(
      `UserService : getUser :: Fetched user details for ${username}`
    );

    return userObj;
  } catch (err) {
    console.log(`UserService : getUser :: Error while fetching user details: ${err}`);

    return null;
  }
};