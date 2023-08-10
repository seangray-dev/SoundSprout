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
		startPackPreviewUpload: (state, action: PayloadAction<Pack>) => {
			state.packData.uploadStatus = 'uploading';
			state.packData.localPreviewFile = action.payload.localPreviewFile;
		},
		finishPackPreviewUpload: (state, action: PayloadAction<Pack>) => {
			state.packData.uploadStatus = 'uploaded';
			state.packData.preview = action.payload.preview;
		},
		failPackPreviewUpload: (state, action: PayloadAction<Pack>) => {
			state.packData.uploadStatus = 'failed';
		},
		startPackImageUpload: (state, action: PayloadAction<Pack>) => {
			state.packData.uploadStatus = 'uploading';
			state.packData.localImageFile = action.payload.localImageFile;
		},
		finishPackImageUpload: (state, action: PayloadAction<Pack>) => {
			state.packData.uploadStatus = 'uploaded';
			state.packData.cover_art_location = action.payload.cover_art_location;
		},
		failPackImageUpload: (state, action: PayloadAction<Pack>) => {
			state.packData.uploadStatus = 'failed';
		},
		startUpload: (state, action: PayloadAction<Sound>) => {
			const sound = action.payload;
			sound.uploadStatus = 'uploading';
			state.soundData.push(sound);
		},
		finishUpload: (state, action: PayloadAction<Sound>) => {
			const sound = action.payload;
			sound.uploadStatus = 'uploaded';
		},
		failUpload: (state, action: PayloadAction<Sound>) => {
			const sound = action.payload;
			sound.uploadStatus = 'failed';
		},
	},
});

export const {
	updatePackData,
	updateSoundData,
	startPackPreviewUpload,
	finishPackPreviewUpload,
	failPackPreviewUpload,
	startPackImageUpload,
	finishPackImageUpload,
	failPackImageUpload,
	startUpload,
	finishUpload,
	failUpload,
} = uploadSlice.actions;
export default uploadSlice.reducer;
