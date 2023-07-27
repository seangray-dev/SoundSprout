import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentSoundState = {
	packId: string | null;
	soundIndex: number | null;
};

const initialState: CurrentSoundState = {
	packId: null,
	soundIndex: null,
};

export const currentSound = createSlice({
	name: 'currentSound',
	initialState,
	reducers: {
		setCurrentSound: (state, action: PayloadAction<CurrentSoundState>) => {
			state.packId = action.payload.packId;
			state.soundIndex = action.payload.soundIndex;
		},
		resetCurrentSound: (state) => {
			state.packId = null;
			state.soundIndex = null;
		},
	},
});

export const { setCurrentSound, resetCurrentSound } = currentSound.actions;

export default currentSound.reducer;
