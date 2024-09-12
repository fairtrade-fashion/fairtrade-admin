import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, Slice } from "@reduxjs/toolkit";

type AppState = {
  email: string;
};

const initialState: AppState = {
  email: "",
};

export const appSlice: Slice<AppState> = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    clearEmail: (state) => {
      state.email = "";
    },
  },
});

export const { setEmail, clearEmail } = appSlice.actions;
export default appSlice.reducer;
