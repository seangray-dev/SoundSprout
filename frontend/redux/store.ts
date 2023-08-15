import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';
import cartReducer from './features/cartSlice';
import currentSound from './features/currentSound-slice';
import searchReducer from './features/searchSlice';
import sortSounds from './features/sortSounds';
import uploadReducer from './features/upload-pack';

export const store = configureStore({
	reducer: {
		authReducer,
		sortSounds,
		currentSound,
		cartReducer,
		uploadReducer,
		searchReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
