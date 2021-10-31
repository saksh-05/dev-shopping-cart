import { createSlice } from "@reduxjs/toolkit";

interface AddItem {
  shop: boolean;
}

const initialState: AddItem = {
  shop: false,
};

const shoppinglistSlice = createSlice({
  name: "addItemToggle",
  initialState,
  reducers: {
    shop: (state) => {
      state.shop = true;
    },
  },
});

export const { shop } = shoppinglistSlice.actions;

export default shoppinglistSlice.reducer;
