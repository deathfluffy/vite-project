import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Word } from "../../types";
import getTokenFromStorage from "../../utils/getTokenFromStorage";

type AddWordPayload = {
  progress: number;
  original: string;
  translation: string;
  isIrregular: boolean;
  categories: string[];
};

export const addWord = createAsyncThunk<Word, AddWordPayload>(
  "words/addWord",
  async (payload, { rejectWithValue }) => {
    try {
      const token = getTokenFromStorage();
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.post(
        "http://localhost:8080/api/words/add",
        payload,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);
export const fetchWordsBySearch = createAsyncThunk(
  "words/fetchBySearch",
  async (search: string, { rejectWithValue }) => {
    try {
      const token = getTokenFromStorage();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          word: search,
        },
      };
      const response = await axios.get(
        `http://localhost:8080/api/words/search?word=${encodeURIComponent(
          search
        )}`,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchWordsByCategory = createAsyncThunk(
  "words/fetchByCategory",
  async (category: string, { rejectWithValue }) => {
    try {
      const token = getTokenFromStorage();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          category: category,
        },
      };
      const response = await axios.get(
        `http://localhost:8080/api/words/category/${category}`,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
export const fetchIsRegular = createAsyncThunk(
  "words/fetchByCategory",
  async (category: string, { rejectWithValue }) => {
    try {
      const token = getTokenFromStorage();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          category: category,
        },
      };
      const response = await axios.get(
        `http://localhost:8080/api/words/category/${category}`,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
export const fetchCategories = createAsyncThunk(
  "words/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const token = getTokenFromStorage();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:8080/api/words/categories",
        config
      );
      return response.data;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const fetchAllWords = createAsyncThunk(
  "words/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = getTokenFromStorage();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "http://localhost:8080/api/words/all",
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
export const deleteWord = createAsyncThunk(
  "words/deleteWord",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const token = getTokenFromStorage();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `http://localhost:8080/api/words/delete/${id}`,
        config
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
export const updateWord = createAsyncThunk(
  "words/updateWord",
  async (
    {
      id,
      owner,
      original,
      translation,
    }: { id: number; owner: number; original: string; translation: string },
    { rejectWithValue }
  ) => {
    try {
      const token = getTokenFromStorage();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const data = {
        owner,
        original,
        translation,
      };
      const response = await axios.put(
        `http://localhost:8080/api/words/update/${id}`,
        data,
        config
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
