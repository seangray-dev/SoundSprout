import { Pack, Sound } from '@/app/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CartItem {
	type: 'sound' | 'pack';
	item: Sound | Pack;
}

interface CartState {
	items: CartItem[];
}

const initialState: CartState = {
	items: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addSoundToCart: (state, action: PayloadAction<Sound>) => {
			state.items.push({ type: 'sound', item: action.payload });
		},
		addPackToCart: (state, action: PayloadAction<Pack>) => {
			state.items.push({ type: 'pack', item: action.payload });
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			const index = state.items.findIndex(
				(cartItem) =>
					(cartItem.item as Sound).id === action.payload ||
					(cartItem.item as Pack).id === action.payload
			);
			if (index > -1) {
				state.items.splice(index, 1);
			}
		},
	},
});

export const { addSoundToCart, addPackToCart, removeFromCart } =
	cartSlice.actions;

export default cartSlice.reducer;
