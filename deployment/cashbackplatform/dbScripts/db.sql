CREATE DATABASE IF NOT EXISTS cashbackplatform;

CREATE TABLE IF NOT EXISTS user (
  id text NOT NULL,
  username text NOT NULL,
  email text,
  password text,
  wallet_address text,
  PRIMARY KEY (id, username)
)