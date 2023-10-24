import {ThunkResult} from '../reducers';
import {appError} from '../reducers/common';
import {setDemo} from '../reducers/demoReducer';
import {zodJsonParseResponse} from '../lib/zod/zodResponse';
import {toDoSchema} from '../types/ToDo';
import {cacheFetch} from '../lib/httpFetch/cacheFetch';

// thunk async functions
export const getTodo =
	(index: number): ThunkResult<Promise<void>> =>
	async (dispatch) => {
		try {
			const req = new Request(`https://jsonplaceholder.typicode.com/todos/${index}`);
			const res = await cacheFetch(req, {ifNoneMatch: true});
			dispatch(setDemo(await zodJsonParseResponse(toDoSchema, res)));
		} catch (err) {
			dispatch(appError(err));
		}
	};
