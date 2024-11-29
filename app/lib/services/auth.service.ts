import { type LoginFormData, type LoginResponse, type LoginErrorResponse } from "@/lib/types/auth.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
console.log(API_URL)
export class AuthError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export const loginUser = async (credentials: LoginFormData): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData = data as LoginErrorResponse;
      throw new AuthError(
        errorData.message,
        errorData.statusCode,
        errorData.error
      );
    }

    return data as LoginResponse;
  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError(
      "Network error",
      500,
      "Failed to connect to server"
    );
  }
}; 