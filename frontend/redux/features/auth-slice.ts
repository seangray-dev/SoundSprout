import { fetchUser } from '@/app/api/api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

export const fetchAuthUser = createAsyncThunk('auth/fetchUser', async () => {
	try {
		const data = await fetchUser();
		return data.user;
	} catch (error) {
		throw new Error('Failed to fetch user');
	}
});

export const auth = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: () => {
			localStorage.removeItem('token');
			return initialState;
		},
		login: (state, action: PayloadAction<User>) => {
			state.isAuth = true;
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAuthUser.fulfilled, (state, action) => {
				state.isAuth = true;
				state.user = action.payload;
			})
			.addCase(fetchAuthUser.rejected, (state, action) => {
				state.isAuth = false;
				state.user = null;
			});
	},
});

export const { logout, login } = auth.actions;
export default auth.reducer;
