export interface User {
  id?: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  surname: string;
  phone: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
