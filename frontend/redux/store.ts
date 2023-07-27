import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';
import sortSounds from './features/sortSounds';

let preloadedState;
const persistedState = localStorage.getItem('authState');

if (persistedState) {
	preloadedState = {
		authReducer: JSON.parse(persistedState),
	};
} else {
	preloadedState = {
		authReducer: {
			isAuth: false,
			user: null,
		},
	};
}

export const store = configureStore({
	reducer: {
		authReducer,
	},
	preloadedState,
});

store.subscribe(() => {
	// When the store changes, save the auth state to localStorage.
	const state = store.getState();
	localStorage.setItem('authState', JSON.stringify(state.authReducer));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
