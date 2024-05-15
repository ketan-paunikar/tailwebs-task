import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../../Reducers/LoginSlice/loginSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
  },
});

export default store;
