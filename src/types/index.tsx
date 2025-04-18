export interface User {
  _id: string;
  email: string;
  name: string;
  password?: string;
  verify?: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthResponse {
  user: User;
  token: string;
}
