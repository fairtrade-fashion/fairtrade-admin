// productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
  name: string;
  page: number;
  limit: number;
  minPrice: string;
  maxPrice: string;
  color: string;
  size: string;
  sortBy: string;
  category: string;
  selectedProductId: string;
}

const initialState: ProductState = {
  name: "",
  page: 1,
  limit: 10,
  minPrice: "",
  maxPrice: "",
  color: "",
  size: "",
  sortBy: "",
  category: "",
  selectedProductId: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<string>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<string>) => {
      state.maxPrice = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setSize: (state, action: PayloadAction<string>) => {
      state.size = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    resetFilters: () => {
      return initialState;
    },
    setSelectedProduct: (state, action: PayloadAction<string>) => {
      state.selectedProductId = action.payload;
    },
  },
});

export const {
  setSearch,
  setPage,
  setLimit,
  setMinPrice,
  setMaxPrice,
  setColor,
  setSize,
  setSortBy,
  setCategory,
  resetFilters,
  setSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;
