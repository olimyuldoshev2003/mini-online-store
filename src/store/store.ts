import { configureStore } from "@reduxjs/toolkit";
import states from "../reducers/states";
import cart from "../reducers/cart";

export const store = configureStore({
  reducer: {
    states,
    cart
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
