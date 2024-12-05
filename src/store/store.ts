import { configureStore } from '@reduxjs/toolkit';
import partyReducer from './slices/partySlice';

const store = configureStore({
  reducer: {
    party: partyReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
