import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import { IAlert } from "./IAlert";

const initialState: IAlert = {
  timeoutId: null,
  message: "",
  status: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<IAlert>) => {
      // const timeoutId = setTimeout(() => {
      //   state.message = "";
      //   state.status = "";
      // }, 4000);

      state.message = action.payload.message;
      state.status = action.payload.status;
      // state.timeoutId = timeoutId;
    },

    clear: (state) => {
      state.message = "";
      state.status = "";
    },
  },
});

export const show = (payload: IAlert): AppThunk => (dispatch) => {
  dispatch(set(payload));

  setTimeout(() => {
    dispatch(clear());
  }, 4000);
};

export const { set, clear } = alertSlice.actions;

export default alertSlice.reducer;
