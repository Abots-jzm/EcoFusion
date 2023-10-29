import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

type InitialState = {
  userId: string | null;
};

const initialState: InitialState = {
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    logout(state) {
      state.userId = null;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
