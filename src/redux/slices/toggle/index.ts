import { createSlice } from "@reduxjs/toolkit";

interface ICounter {
  activea: boolean;
  activeb: boolean;
  activec: boolean;
}

const initialState: ICounter = {
  activea: true,
  activeb: false,
  activec: false,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    activea: (state) => {
      state.activea = true;
      state.activeb = false;
      state.activec = false;
    },
    activeb: (state) => {
      state.activea = false;
      state.activeb = true;
      state.activec = false;
    },
    activec: (state) => {
      state.activea = false;
      state.activeb = false;
      state.activec = true;
    },
  },
});

export const { activea, activeb, activec } = toggleSlice.actions;

export default toggleSlice.reducer;
