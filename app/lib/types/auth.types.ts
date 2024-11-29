export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface LoginErrorResponse {
  message: string;
  error: string;
  statusCode: number;
} 