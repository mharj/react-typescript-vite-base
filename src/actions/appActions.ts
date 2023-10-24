import {ThunkResult} from '../reducers';
import {appLogin} from '../reducers/appReducer';
import {appError} from '../reducers/common';

export const doLogin =
	(username: string, password: string): ThunkResult<Promise<void>> =>
	(dispatch) => {
		try {
			// do login here
			if (username === 'test' && password === 'password') {
				dispatch(appLogin(true));
			} else {
				dispatch(appLogin(false));
				throw new Error('account or password not match');
			}
		} catch (err) {
			dispatch(appError(err));
		}
		return Promise.resolve();
	};

export const doLogout = (): ThunkResult<Promise<void>> => (dispatch) => {
	// do logout here
	dispatch(appLogin(false));
	return Promise.resolve();
};
