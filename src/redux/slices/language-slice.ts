import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: "vi",
};

export const languageSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {},
  },
});

export const { increment } = languageSlice.actions;

export default languageSlice.reducer;
