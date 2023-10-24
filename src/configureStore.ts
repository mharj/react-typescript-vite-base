import {configureStore} from '@reduxjs/toolkit';
import {PersistConfig, persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import {getKey} from './lib/persist';
import {initialState, ReduxState, rootReducer} from './reducers';
import {appError} from './reducers/common';

const persistConfig: PersistConfig<ReduxState> = {
	key: getKey('root'),
	storage,
	whitelist: [],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, appError.type],
			},
		}).concat(thunk),
	preloadedState: initialState,
	devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
