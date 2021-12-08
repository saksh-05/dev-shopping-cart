import { createSlice } from "@reduxjs/toolkit";

interface ItemCounter {
  itemArray: {
    [index: string]: number;
  };
  itemCategory: {
    [index: string]: number;
  };
}

const initialState: ItemCounter = {
  itemArray: {},
  itemCategory: {},
};

const itemCounterSlice = createSlice({
  name: "item counter",
  initialState,
  reducers: {
    itemIncrease: (state, action) => {
      if (state.itemArray[action.payload.item._id]) {
        return {
          ...state,
          itemArray: {
            ...state.itemArray,
            [action.payload.item._id]: ++action.payload.count,
          },
        };
      } else {
        return {
          itemArray: {
            ...state.itemArray,
            [action.payload.item._id]: ++action.payload.count,
          },
          itemCategory: {
            ...state.itemCategory,
            [action.payload.item.category]: ++action.payload.ctgCount,
          },
        };
      }
    },
    itemDecrease: (state, action) => {
      const delId = action.payload.item._id;
      const delCategory = action.payload.item.category;
      if (state.itemCategory[delCategory] === 1) {
        const { [delCategory]: rm, ...newItemCategory } = state.itemCategory;
        const { [delId]: remove, ...newItemArray } = state.itemArray;
        if (state.itemArray[delId] === 1) {
          return {
            ...state,
            itemCategory: newItemCategory,
            itemArray: newItemArray,
          };
        } else {
          return {
            ...state,
            itemArray: {
              ...state.itemArray,
              [action.payload.item._id]: --action.payload.count,
            },
          };
        }
      } else {
        if (state.itemArray[delId] === 1) {
          const { [delId]: remove, ...newItemArray } = state.itemArray;
          return {
            ...state,
            itemArray: newItemArray,
            itemCategory: {
              ...state.itemCategory,
              [action.payload.item.category]: --action.payload.ctgCount,
            },
          };
        } else {
          return {
            ...state,
            itemArray: {
              ...state.itemArray,
              [action.payload.item._id]: --action.payload.count,
            },
          };
        }
      }
    },
    itemDelete: (state, action) => {
      const delId = action.payload.item._id;
      const delCategory = action.payload.item.category;
      const { [delId]: remove, ...newItemArray } = state.itemArray;
      if (state.itemCategory[delCategory] === 1) {
        const { [delCategory]: remove, ...newItemCategory } =
          state.itemCategory;
        return {
          ...state,
          itemCategory: newItemCategory,
          itemArray: newItemArray,
        };
      } else {
        return {
          itemArray: newItemArray,
          itemCategory: {
            ...state.itemCategory,
            [action.payload.item.category]: --action.payload.ctgCount,
          },
        };
      }
    },
  },
});

export const { itemIncrease, itemDecrease, itemDelete } =
  itemCounterSlice.actions;

export default itemCounterSlice.reducer;
