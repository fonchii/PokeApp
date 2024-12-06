import { configureStore } from '@reduxjs/toolkit';
import partyReducer from './slices/partySlice';
import pcBoxReducer from './slices/pcBoxSlice';

const store = configureStore({
  reducer: {
    party: partyReducer,
    pcBox: pcBoxReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
