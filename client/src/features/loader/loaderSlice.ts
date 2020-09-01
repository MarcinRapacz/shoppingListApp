import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoader } from "./ILoader";

const initialState: ILoader = {
  active: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<ILoader>) => {
      state.active = action.payload.active;
    },
  },
});

export const { set } = loaderSlice.actions;

export default loaderSlice.reducer;
