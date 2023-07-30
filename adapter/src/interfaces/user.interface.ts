import { AllCashback } from "./cashback.interface";

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
  availableCashback?: AllCashback;
}

export interface UserResponse {
  username: string;
  org: string;
}
