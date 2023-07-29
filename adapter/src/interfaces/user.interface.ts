export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  username: string;
  password: string;
  email: string;
}

export interface UserDetails {
  userId: string;
  username: string;
  password: string;
  email: string;
  walletAddress: string;
}

export interface UserResponse {
  username: string;
}
