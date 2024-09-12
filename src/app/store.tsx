import { loginApi } from "@/domain/auth/api/auth.api";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import appReducer from "@/app/features/app.slice";
import selectSlice from "@/app/features/color.slice";
import productReducer from "@/app/features/product.slice";
import pageSliderReducer from "@/app/features/page_slider.slice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    [api.reducerPath]: api.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    app: appReducer,
    select: selectSlice,
    pageSlider: pageSliderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([api.middleware, loginApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
