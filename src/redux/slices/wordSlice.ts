import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Word, WordState } from "../../types";
import { deleteWord, fetchAllWords, fetchCategories, fetchWordsByCategory, fetchWordsBySearch, updateWord } from "../thunks/wordThunk";

const initialState: WordState = {
  words: [],
  categories: [],
  status: "idle",
  error: null,
  message: "",
};

const wordSlice = createSlice({
  name: "words",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllWords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllWords.fulfilled,
        (state, action: PayloadAction<Word[]>) => {
          state.status = "succeeded";
          state.words = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchAllWords.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.status = "succeeded";
          state.categories = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchWordsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchWordsByCategory.fulfilled,
        (state, action: PayloadAction<Word[]>) => {
          state.status = "succeeded";
          state.words = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchWordsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchWordsBySearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWordsBySearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.words = [action.payload.result];
        state.error = null;
      })
      .addCase(fetchWordsBySearch.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message || "An error occurred";
        state.error = action.payload as string;
      })
      .addCase(deleteWord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteWord.fulfilled, (state, action: PayloadAction<Word[]>) => {
        state.status = "succeeded";
        state.words = action.payload;
        state.error = null;
      })
      .addCase(deleteWord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateWord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateWord.fulfilled, (state, action: PayloadAction<Word[]>) => {
        state.status = "succeeded";
        state.words = action.payload;
        state.error = null;
      })
      .addCase(updateWord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default wordSlice.reducer;
