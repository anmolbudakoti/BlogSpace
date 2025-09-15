import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies with requests
});

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface AuthUser {
  _id: string
  name: string
  email: string
  role: string
}

export interface AuthResponse {
  _id: string
  name: string
  email: string
  role: string
}

export const loginService = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

export const registerService = async (userData: RegisterData): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/register', userData);
  return response.data;
};

export const getCurrentUserService = async (): Promise<AuthUser> => {
  const response = await apiClient.get<AuthUser>('/auth/profile');
  return response.data;
};

export const logoutService = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};