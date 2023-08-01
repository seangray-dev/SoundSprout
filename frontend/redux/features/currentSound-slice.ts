import { Sound } from '@/app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentSoundState = Sound & {
	coverArt: string | null;
	soundIndex: number | null;
	isPlaying: boolean;
};

const initialState: CurrentSoundState = {
	id: null as any,
	name: null as any,
	audio_file: null as any,
	bpm: null as any,
	key: null as any,
	price: null as any,
	pack: null as any,
	purchase_count: null as any,
	created_at: null as any,
	modified_at: null as any,
	coverArt: null,
	soundIndex: null,
	isPlaying: false,
};

export const currentSound = createSlice({
	name: 'currentSound',
	initialState,
	reducers: {
		setCurrentSound: (state, action: PayloadAction<CurrentSoundState>) => {
			state.pack = action.payload.pack;
			state.soundIndex = action.payload.soundIndex;
			state.coverArt = action.payload.coverArt;
			state.name = action.payload.name;
			state.key = action.payload.key;
			state.price = action.payload.price;
			state.bpm = action.payload.bpm;
			state.audio_file = action.payload.audio_file;
		},
		resetCurrentSound: (state) => {
			state.pack = null as any;
			state.soundIndex = null;
			state.coverArt = null;
			state.name = null as any;
			state.key = null as any;
			state.bpm = null as any;
			state.audio_file = null as any;
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
