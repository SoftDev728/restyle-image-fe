import { createSlice } from "@reduxjs/toolkit";

type InitialStateTypes = {
  taskId?: string;
};

const initialState: InitialStateTypes = {};

export const resultImageSlice = createSlice({
  name: "resultImage",
  initialState,
  reducers: {
    setTaskId: (state, action) => {
      state.taskId = action.payload;
    },
  },
});

export const { setTaskId: dispatchSetTaskId } = resultImageSlice.actions;

const resultImageReducer = resultImageSlice.reducer;
export default resultImageReducer;
