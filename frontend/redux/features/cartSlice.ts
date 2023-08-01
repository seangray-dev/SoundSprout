import { Sound } from '@/app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
	items: Sound[];
}

const initialState: CartState = {
	items: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<Sound>) => {
			state.items.push(action.payload);
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			const index = state.items.findIndex(
				(sound) => sound.id === action.payload
			);
			if (index > -1) {
				state.items.splice(index, 1);
			}
		},
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
