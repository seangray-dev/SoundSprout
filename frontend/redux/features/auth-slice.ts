import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	id: string;
};

type AuthState = {
	isAuth: boolean;
	user: User | null;
};

const initialState: AuthState = {
	isAuth: false,
	user: null,
};

export const auth = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: () => {
			return initialState;
		},
		login: (state, action: PayloadAction<User>) => {
			state.isAuth = true;
			state.user = action.payload;
		},
	},
});

export const { logout, login } = auth.actions;
export default auth.reducer;
