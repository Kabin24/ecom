import { configureStore } from "@reduxjs/toolkit";

import UserReducer from "../reducers/user.reducer";

const store = configureStore({
  reducer: {
    // global  states
    user: UserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
