import { Pack, Sound } from '@/app/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UploadState {
	packData: Pack;
	soundData: Sound[];
}

const initialState: UploadState = {
	packData: {} as Pack,
	soundData: [],
};

const uploadSlice = createSlice({
	name: 'upload',
	initialState,
	reducers: {
		updatePackData: (state, action: PayloadAction<Pack>) => {
			state.packData = action.payload;
		},
		updateSoundData: (state, action: PayloadAction<Sound[]>) => {
			state.soundData = action.payload;
		},
	},
});

export const { updatePackData, updateSoundData } = uploadSlice.actions;
export default uploadSlice.reducer;
