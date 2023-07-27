import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SortState {
	field: 'name' | 'duration' | 'key' | 'bpm';
	order: 'asc' | 'desc';
}

const initialState: SortState = {
	field: 'name',
	order: 'asc',
};

export const sortSounds = createSlice({
	name: 'sort',
	initialState,
	reducers: {
		setSortField: (state, action: PayloadAction<SortState['field']>) => {
			state.field = action.payload;
		},
		toggleSortOrder: (state) => {
			state.order = state.order === 'asc' ? 'desc' : 'asc';
		},
	},
});

export const { setSortField, toggleSortOrder } = sortSounds.actions;

export default sortSounds.reducer;
