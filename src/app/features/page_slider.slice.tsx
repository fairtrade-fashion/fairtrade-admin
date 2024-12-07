import { createSlice, Slice } from "@reduxjs/toolkit";

export enum ProductPageSlider {
  productPageClose = "productPageClose",
  ViewProductPage = "View_ProductPage",
}

type TinitialState = {
  productPageSlider: ProductPageSlider;
};

const initialState: TinitialState = {
  productPageSlider: ProductPageSlider.productPageClose,
};

export const pageSliderSlice: Slice<TinitialState> = createSlice({
  name: "pageSlider",
  initialState,
  reducers: {
    productPageClose: (state) => {
      state.productPageSlider = ProductPageSlider.productPageClose;
    },
    View_ProductPage: (state) => {
      state.productPageSlider = ProductPageSlider.ViewProductPage;
    },
  },
});

export const { View_ProductPage, productPageClose } = pageSliderSlice.actions;

export default pageSliderSlice.reducer;
