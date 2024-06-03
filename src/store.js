
import { configureStore, createSlice } from '@reduxjs/toolkit';

const nameSlice = createSlice({
  name: 'name',
  initialState: '',
  reducers: {
    setName: (state, action) => action.payload,
  },
});

const roomSlice = createSlice({
  name: 'room',
  initialState: '',
  reducers: {
    setRoom: (state, action) => action.payload,
  },
});

export const { setName } = nameSlice.actions;
export const { setRoom } = roomSlice.actions;


const store = configureStore({
  reducer: {
    name: nameSlice.reducer,
    room: roomSlice.reducer,
  },
});

export default store;
