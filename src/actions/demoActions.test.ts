import {describe, it} from 'vitest';
import {store} from '../configureStore';
import {getTodo} from './demoActions';
import {toDoSchema} from '../types/ToDo';

const dispatch = store.dispatch;
const getState = store.getState;

describe('Demo Actions', function () {
	it('should get todo', async function () {
		await dispatch(getTodo(1));
		toDoSchema.strict().parse(getState().demo.todo);
	});
});
