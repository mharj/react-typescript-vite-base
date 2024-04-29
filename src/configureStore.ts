import {configureStore} from '@reduxjs/toolkit';
import {persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

import {initialState, rootReducer} from './reducers';
import {appError} from './reducers/common';

const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, appError.type];

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: process.env.NODE_ENV === 'development' ? {ignoredActions} : false,
			immutableCheck: process.env.NODE_ENV === 'development',
			thunk: true,
		}),
	preloadedState: initialState,
	devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
