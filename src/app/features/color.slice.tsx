import { createSlice } from "@reduxjs/toolkit";

const selectSlice = createSlice({
  name: "selectOptions",
  initialState: {
    sizes: [],
    colors: [],
  },
  reducers: {
    setSelectSizes: (state, action) => {
      state.sizes = action.payload;
    },
    setSelectColors: (state, action) => {
      state.colors = action.payload;
    },
  },
});

export const { setSelectColors, setSelectSizes } = selectSlice.actions;
export default selectSlice.reducer;
