import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '.';
import { type DisplayItem } from '../types/DisplayTypes';

// INITIAL STATE
interface DisplayStateItem {
  order: number;
  item: DisplayItem;
}
interface DisplayState {
  items: Record<string, DisplayStateItem>;
}
const initialState: DisplayState = {
  items: {},
};

// SLICE
const counterSlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<DisplayItem>) {
      if (state.items[action.payload.id] === undefined)
        state.items[action.payload.id] = {
          order: getDisplayStateItemsTopOrder(state) + 1,
          item: action.payload,
        };
    },
    removeItem(state, action: PayloadAction<string>) {
      const items: Record<string, DisplayStateItem> = {};
      Object.keys(state.items).forEach((key) => {
        if (key === action.payload) return;
        items[key] = state.items[key];
      });
      state.items = items;
    },
  },
});

// INTERNAL GETTERS
const getDisplayStateItemsTopOrder = (state: DisplayState) => {
  let orderMax = 0;
  for (const item of Object.values(state.items)) {
    if (item.order > orderMax) orderMax = item.order;
  }
  return orderMax;
};

// SELECTORS
const selectDisplayStateItems = (state: RootState) => state.display.items;
const selectOrderedDisplayStateItems = createSelector(
  selectDisplayStateItems,
  (items) => {
    return Array.from(Object.values(items)).sort((a, b) => b.order - a.order);
  }
);
const selectOrderedDisplayStateItemsTop = createSelector(
  selectOrderedDisplayStateItems,
  (items) => {
    if (items.length === 0) return null;
    return items[0];
  }
);
const selectOrderedDisplayStateItemsTopOrder = createSelector(
  selectOrderedDisplayStateItemsTop,
  (item) => {
    if (item === null) return 0;
    return item.order;
  }
);
const selectOrderedDisplayItems = createSelector(
  selectOrderedDisplayStateItems,
  (items) => {
    return items.map((item) => item.item);
  }
);

// EXPORTS
export const { addItem, removeItem } = counterSlice.actions;
export {
  selectDisplayStateItems,
  selectOrderedDisplayStateItems,
  selectOrderedDisplayStateItemsTop,
  selectOrderedDisplayStateItemsTopOrder,
  selectOrderedDisplayItems,
};
export default counterSlice.reducer;
