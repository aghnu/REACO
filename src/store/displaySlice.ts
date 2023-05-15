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
    updateDisplayItem(state, action: PayloadAction<DisplayItem>) {
      if (state.items[action.payload.id] !== undefined)
        state.items[action.payload.id].item = action.payload;
    },
    addDisplayItem(state, action: PayloadAction<DisplayItem>) {
      if (state.items[action.payload.id] === undefined)
        state.items[action.payload.id] = {
          order: getDisplayStateItemsTopOrder(state) + 1,
          item: action.payload,
        };
    },
    removeDisplayItem(state, action: PayloadAction<string>) {
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
const getDisplayStateItems = (state: DisplayState) => state.items;
const getDisplayStateItemsTopOrder = createSelector(
  getDisplayStateItems,
  (items) => {
    let orderMax = 0;
    for (const item of Object.values(items)) {
      if (item.order > orderMax) orderMax = item.order;
    }
    return orderMax;
  }
);

// SELECTORS
const selectDisplayStateItems = (state: RootState) =>
  getDisplayStateItems(state.display);
const selectGetDisplayItem = createSelector(
  selectDisplayStateItems,
  (items) => {
    return (id: string) => {
      const item = items[id];
      if (item === undefined) return null;
      return item.item;
    };
  }
);
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
export const { addDisplayItem, removeDisplayItem, updateDisplayItem } =
  counterSlice.actions;
export {
  selectGetDisplayItem,
  selectDisplayStateItems,
  selectOrderedDisplayStateItems,
  selectOrderedDisplayStateItemsTop,
  selectOrderedDisplayStateItemsTopOrder,
  selectOrderedDisplayItems,
};
export default counterSlice.reducer;
