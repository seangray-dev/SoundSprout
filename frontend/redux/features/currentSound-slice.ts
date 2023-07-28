import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentSoundState = {
	packId: string | null;
	soundIndex: number | null;
	coverArt: string | null;
	name: string | null;
	key: string | null;
	bpm: number | null;
	audioFile: string | null;
	isPlaying: boolean;
};

const initialState: CurrentSoundState = {
	packId: null,
	soundIndex: null,
	coverArt: null,
	name: null,
	key: null,
	bpm: null,
	audioFile: null,
	isPlaying: false,
};

export const currentSound = createSlice({
	name: 'currentSound',
	initialState,
	reducers: {
		setCurrentSound: (state, action: PayloadAction<CurrentSoundState>) => {
			state.packId = action.payload.packId;
			state.soundIndex = action.payload.soundIndex;
			state.coverArt = action.payload.coverArt;
			state.name = action.payload.name;
			state.key = action.payload.key;
			state.bpm = action.payload.bpm;
			state.audioFile = action.payload.audioFile;
		},
		resetCurrentSound: (state) => {
			state.packId = null;
			state.soundIndex = null;
			state.coverArt = null;
			state.name = null;
			state.key = null;
			state.bpm = null;
			state.audioFile = null;
		},
		togglePlay: (state) => {
			state.isPlaying = !state.isPlaying;
		},
		playNext: (state, action: PayloadAction<number>) => {},
		playPrevious: (state, action: PayloadAction<number>) => {},
	},
});

export const {
	setCurrentSound,
	resetCurrentSound,
	togglePlay,
	playNext,
	playPrevious,
} = currentSound.actions;

export default currentSound.reducer;
