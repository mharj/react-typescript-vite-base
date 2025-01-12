import {describe, expect, it} from 'vitest';
import {store} from '../configureStore';
import {doLogin} from './appActions';

const dispatch = store.dispatch;
const getState = store.getState;

describe('App Actions', function () {
	it('should login', async function () {
		await dispatch(doLogin('test', 'password'));
		expect(getState().app.isLoggedIn).to.equal(true);
	});
	it('should not login', async function () {
		await dispatch(doLogin('wrong', 'password'));
		expect(getState().app.isLoggedIn).to.equal(false);
		expect(getState().app.error).to.equal('account or password not match');
	});
});
