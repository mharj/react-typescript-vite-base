import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {getTodo} from '../actions/demoActions';
import {useSelector, useThunkDispatch} from '../reducers';
import {useI18NFormat} from '../hooks/useI18NFormat';

const HomeView: React.FC = () => {
	const f = useI18NFormat('capitalize');
	const dispatch = useThunkDispatch();
	const todo = useSelector((state) => state.demo.todo);
	useEffect(() => {
		void dispatch(getTodo(1));
	}, [dispatch]);
	return (
		<div>
			<Helmet>
				<title>{f('home')}</title>
			</Helmet>
			<div className="App-intro">
				To get started, edit <code>src/App.js</code> and save to reload.
				<br />
				<h1>
					{f('hello')} Todo {f('example')}
				</h1>
				{todo ? (
					<table style={{marginLeft: 'auto', marginRight: 'auto', border: '1px solid black'}}>
						<tbody>
							<tr>
								<th>{f('todo:id')}:</th>
								<td>{todo.id}</td>
							</tr>
							<tr>
								<th>{f('todo:user_id')}:</th>
								<td>{todo.userId}</td>
							</tr>
							<tr>
								<th>{f('todo:title')}:</th>
								<td>{todo.title}</td>
							</tr>
							<tr>
								<th>{f('todo:completed')}:</th>
								<td>{todo.completed ? f('yes') : f('no')}</td>
							</tr>
						</tbody>
					</table>
				) : null}
			</div>
		</div>
	);
};

export default HomeView;
