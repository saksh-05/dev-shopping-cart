import { createSlice } from "@reduxjs/toolkit";

interface ICounter {
  activea: boolean;
  activeb: boolean;
  activec: boolean;
  itemView: {
    showId: string;
    showShoppingItem: boolean;
  };
}

const initialState: ICounter = {
  activea: true,
  activeb: false,
  activec: false,
  itemView: {
    showId: "",
    showShoppingItem: false,
  },
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
    viewItem: (state, action) => {
      return {
        ...state,
        itemView: {
          showId: action.payload.itemId,
          showShoppingItem: !state.itemView.showShoppingItem,
        },
      };
    },
    
  },
});

export const { activea, activeb, activec, viewItem } = toggleSlice.actions;

export default toggleSlice.reducer;
