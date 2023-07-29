CREATE DATABASE IF NOT EXISTS cashbackplatform;

CREATE TABLE IF NOT EXISTS user (
  id int,
  username text,
  email text,
  password text,
  wallet_address text,
  PRIMARY KEY (id, username)
);