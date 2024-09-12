// productSlice.ts
import { Product } from "@/domain/products/models/products.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
  search: string;
  page: number;
  limit: number;
  minPrice: number;
  maxPrice: number;
  color: string;
  size: string;
  sortBy: "name" | "price" | "createdAt";
  category: string;
  selectedProduct: Product | null;
}

const initialState: ProductState = {
  search: "",
  page: 1,
  limit: 10,
  minPrice: 0,
  maxPrice: 0,
  color: "",
  size: "",
  sortBy: "createdAt",
  category: "",
  selectedProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setSize: (state, action: PayloadAction<string>) => {
      state.size = action.payload;
    },
    setSortBy: (
      state,
      action: PayloadAction<"name" | "price" | "createdAt">
    ) => {
      state.sortBy = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    resetFilters: () => {
      return initialState;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
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
