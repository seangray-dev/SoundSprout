import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';
import currentSound from './features/currentSound-slice';
import sortSounds from './features/sortSounds';

export const store = configureStore({
	reducer: {
		authReducer,
		sortSounds,
		currentSound,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
