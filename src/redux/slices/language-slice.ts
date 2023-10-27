import { createSlice } from "@reduxjs/toolkit";

export interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: "vi",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state) => {
      if (state.language === "vi") {
        state.language = "en";
      } else {
        state.language = "vi";
      }
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
