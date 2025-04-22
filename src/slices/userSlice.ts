import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  name: string;
  email: string;
  updatedAt: string;
  createdAt: string;
}

interface IinitialState {
  user: IUser | null;
}

function getUserFromLocalStorage() {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

const initialState: IinitialState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
