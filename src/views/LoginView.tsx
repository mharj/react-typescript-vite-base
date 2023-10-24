import {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {useNavigate} from 'react-router';
import {doLogin, doLogout} from '../actions/appActions';
import {useSelector, useThunkDispatch} from '../reducers';
import {useI18NFormat} from '../hooks/useI18NFormat';

const LoginView = () => {
	const nav = useNavigate();
	const f = useI18NFormat('capitalize');
	const dispatch = useThunkDispatch();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
	const handleLogin = async () => {
		await dispatch(doLogin(username, password));
		nav('/');
	};
	return (
		<div>
			<Helmet>
				<title>{f('login')}</title>
			</Helmet>
			{isLoggedIn ? (
				<div>
					<button onClick={() => dispatch(doLogout())}>{f('logout')}</button>
				</div>
			) : (
				<div>
					<form>
						Username:{' '}
						<input
							name="username"
							type="text"
							autoComplete="username"
							onChange={({currentTarget}) => setUsername(currentTarget.value || '')}
							value={username}
						/>{' '}
						<br />
						Password:{' '}
						<input
							name="password"
							type="password"
							autoComplete="current-password"
							onKeyUp={async (ev) => {
								ev.preventDefault();
								if (ev.key === 'Enter') {
									await handleLogin();
								}
							}}
							onChange={({currentTarget}) => setPassword(currentTarget.value || '')}
							value={password}
						/>{' '}
						<br />
						<button onClick={() => handleLogin()}>{f('login')}</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default LoginView;
