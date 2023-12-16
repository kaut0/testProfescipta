import {PayloadAction, createSlice} from '@reduxjs/toolkit';
export interface itemInterface {
  data: any;
}

const initialState: itemInterface = {
  data: [],
};

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    itemData: (state, action: PayloadAction<any>) => {
      state.data = [...state.data, action.payload];
    },
    getData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const {itemData, getData} = itemSlice.actions;
export default itemSlice.reducer;
