import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "tailwebs_user",
  password: "tailwebs@123",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setUserName, setPassword } = loginSlice.actions;

export const selectUserName = (state) => state.login.userName;
export const selectPassword = (state) => state.login.password;

export default loginSlice.reducer;
