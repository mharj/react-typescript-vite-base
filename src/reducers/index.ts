import {shallowEqual, TypedUseSelectorHook, useDispatch, useSelector as useReduxSelector} from 'react-redux';
import {Action, combineReducers} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {reducerConfig as appReducerConfig} from './appReducer';
import {reducerConfig as demoReducerConfig} from './demoReducer';
import {useCallback, useState} from 'react';

/**
 * Combine all initial states
 * @see {@link createStore/default}
 */
export const initialState: ReduxState = {
	...appReducerConfig.initialState,
	...demoReducerConfig.initialState,
};

/**
 * Combine all reducers with names
 */
export const rootReducer = combineReducers({
	...appReducerConfig.reducer,
	...demoReducerConfig.reducer,
});

/**
 * Redux selector hook
 * @example
 * const todo = useSelector((state) => state.demo.todo);
 */
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/**
 * Redux shallow selector hook
 * @example
 * const {todo} = useShallowSelector((state) => ({
 *   todo: state.demo.todo,
 * }));
 */
export function useShallowSelector<TState = ReduxState, TSelected = unknown>(selector: (state: TState) => TSelected) {
	return useReduxSelector(selector, shallowEqual);
}

function isPromise(action: unknown): action is Promise<unknown> {
	return typeof action === 'object' && 'catch' in (action as Promise<unknown>) && typeof (action as Promise<unknown>).catch === 'function';
}

/**
 * useThunkDispatch hook with error handling
 * @example
 * const dispatch = useThunkDispatch();
 * dispatch(someThunkAction());
 */
export function useThunkDispatch(): RootThunkDispatch {
	const dispatch = useDispatch<RootThunkDispatch>();
	const [error, setError] = useState<unknown | undefined>(undefined);
	if (error) {
		throw error;
	}
	return useCallback(
		(action: Parameters<typeof dispatch>[0]) => {
			try {
				const ret = dispatch(action);
				if (isPromise(ret)) {
					ret.catch((e: unknown) => {
						setError(e); // hook error function to catch promise error
					});
				}
				return ret;
			} catch (e) {
				setError(e);
			}
		},
		[dispatch],
	);
}

export type ReduxState = ReturnType<typeof rootReducer>;

export type RootThunkDispatch = ThunkDispatch<ReduxState, undefined, Action>;

/**
 * @example
 * export const someAsyncFunc = (): ThunkResult<Promise<void>> => async (dispatch, getState) => {
 *
 * }
 */
export type ThunkResult<R> = ThunkAction<R, ReduxState, undefined, Action>;
