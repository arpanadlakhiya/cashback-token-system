import * as db from "./dbClient";
import { Client } from "cassandra-driver";

const GET_USER = "SELECT * FROM user WHERE username = ? ALLOW FILTERING";

const REGISTER_USER =
  "INSERT INTO USER (id,username,email,password,wallet_address) VALUES (?, ?, ?, ?, ?)";

const GET_ALL_USER = "SELECT * FROM user";

const GET_MAX_USER_ID = "SELECT MAX(id) as userId FROM USER";

export const getUser = async (dbClient: Client, username: string) => {
  const result = await db.executeQuery(dbClient, GET_USER, [username]);
  return result.rows[0];
};

export const getAllUsers = async (dbClient: Client, username: string) => {
  const result = await db.executeQuery(dbClient, GET_ALL_USER, []);
  return result.rows;
};

export const getMaxUserID = async (dbClient: Client) => {
  const result = await db.executeQuery(dbClient, GET_MAX_USER_ID, []);
  return result.rows[0];
};

export const registerUser = async (
  dbClient: Client,
  userId: string,
  username: string,
  email: string,
  hashedPassword: string,
  walletAddress: string
) => {
  console.log(`User DB :: Inserting user details for ${username}`);

  try {
    await db.executeQuery(dbClient, REGISTER_USER, [
      userId,
      username,
      email,
      hashedPassword,
      walletAddress
    ]);

    console.log(`User DB :: Inserted user details for ${username}`);

    return {
      status: "success",
      message: `User ${username} has been registered successfully`,
    };
  } catch (e) {
    console.log(
      `User DB :: Failed to insert user details for ${username}: ${e}`
    );

    return {
      status: "error",
      message: `Failed to register user ${username}`,
    };
  }
};
