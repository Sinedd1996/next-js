import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorMessageProcess {
  errorMessage: string | null,
}

const initialState: ErrorMessageProcess = {
  errorMessage: null,
};

const errorMessageSlice = createSlice({
  name: "errorMessage",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      const { error } = action.payload;
      state.errorMessage = error;
    },
    removeError: (state) => {
      state.errorMessage = null;
    },
  },
});

export const { setError, removeError } = errorMessageSlice.actions;
export default errorMessageSlice.reducer;
