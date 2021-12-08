import { createSlice } from "@reduxjs/toolkit";

interface AddItem {
  shop: boolean;
  show: boolean;
  title: string;
}

const initialState: AddItem = {
  shop: false,
  show: false,
  title: "Shopping List",
};

const shoppinglistSlice = createSlice({
  name: "addItemToggle",
  initialState,
  reducers: {
    shop: (state) => {
      state.shop = true;
    },
    addItem: (state) => {
      state.show = !state.show;
    },
    changeTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { shop, addItem ,changeTitle} = shoppinglistSlice.actions;

export default shoppinglistSlice.reducer;
