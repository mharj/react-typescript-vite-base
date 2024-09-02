import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {buildSliceConfig, getKey, migrateInit} from '../lib/persist';
import {resetAction} from './common';
import {ToDo} from '../types/ToDo';

/**
 * Redux state interface
 */
interface IState {
	todo: ToDo | undefined;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	_persist: any;
}

/**
 * Initial redux state
 */
const initialState: IState = {
	todo: undefined,
	_persist: undefined,
};

const slice = createSlice({
	name: 'demo',
	initialState,
	reducers: {
		setDemo: (state, action: PayloadAction<ToDo>) => {
			state.todo = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(resetAction, () => initialState);
	},
});

export const {setDemo} = slice.actions; // export actions

export const reducerConfig = buildSliceConfig(
	slice,
	persistReducer(
		{
			key: getKey(slice.name),
			storage,
			migrate: migrateInit(initialState),
		},
		slice.reducer,
	),
);
