import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthResponse } from "../../types";
import axios from "axios";
import getErrorMessage from "../../utils/api";
import getTokenFromStorage from "../../utils/getTokenFromStorage";

interface ErrorResponse {
  message: string;
}

export const register = createAsyncThunk<
  AuthResponse,
  { email: string; password: string; name: string },
  { rejectValue: ErrorResponse }
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/auth/register",
      credentials
    );
    return data;
  } catch (err) {
    return rejectWithValue({ message: getErrorMessage(err) });
  }
});

export const login = createAsyncThunk<
  AuthResponse,
  { email: string; password: string },
  { rejectValue: ErrorResponse }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/auth/login",
      credentials
    );
    return data;
  } catch (err) {
    return rejectWithValue({ message: getErrorMessage(err) });
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: ErrorResponse }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const token = getTokenFromStorage();

      if (!token) {
        localStorage.removeItem("persist:auth");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post("http://localhost:8080/api/auth/logout", {}, config);
      localStorage.removeItem("persist:auth");
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");

    } catch (err) {
      return rejectWithValue({ message: getErrorMessage(err) });
    }
  }
);
