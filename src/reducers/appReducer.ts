import {persistReducer} from 'redux-persist';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {buildSliceConfig, getKey, initialPersistState, migrateInit} from '../lib/persist';
import {resetAction} from './common';
import {PersistPartial} from 'redux-persist/lib/persistReducer';

/**
 * Redux state interface
 */
interface IState extends PersistPartial {
	error: string | undefined;
	isLoading: boolean;
	isLoggedIn: boolean;
}

/**
 * Initial redux state
 */
const initialState: IState = {
	error: undefined,
	isLoading: false,
	isLoggedIn: false,
	_persist: initialPersistState,
};

const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		appLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		appLogin: (state, action: PayloadAction<boolean>) => {
			state.isLoggedIn = action.payload;
		},
		appLogout: (state) => {
			state.isLoggedIn = false;
		},
		appError: (state, action: PayloadAction<unknown>) => {
			if (!action.payload) {
				state.error = undefined;
				return;
			}
			if (typeof action.payload === 'string') {
				state.error = action.payload;
				return;
			}
			if (typeof action.payload === 'object' && action.payload instanceof Error) {
				state.error = action.payload.message;
				return;
			}
			state.error = `${action.payload}`;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(resetAction, () => initialState);
	},
});

export const {appLoading, appLogin, appError, appLogout} = slice.actions; // export actions

export const reducerConfig = buildSliceConfig(
	slice,
	persistReducer(
		{
			key: getKey(slice.name),
			storage,
			blacklist: ['isLoading', 'error'],
			migrate: migrateInit(initialState),
		},
		slice.reducer,
	),
);
