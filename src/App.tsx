import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import reactLogo from './assets/react.svg';
import './App.css';
import {useServiceWorker} from './lib/serviceWorker/useServiceWorker';
import ErrorBoundary from './components/ErrorBoundary';
import {useSelector} from './reducers';
import PrivateComponent from './components/PrivateComponent';
import {useTranslation} from 'react-i18next';
import {useI18NFormat} from './hooks/useI18NFormat';

const Loading = () => <div>Loading!...</div>;
const HomeView = React.lazy(() => import('./views/HomeView' /* webpackChunkName: "home-view" */));
const LoginView = React.lazy(() => import('./views/LoginView' /* webpackChunkName: "login-view" */));
const SecretView = React.lazy(() => import('./views/SecretView' /* webpackChunkName: "secret-view" */));
const BrokenView = React.lazy(() => import('./views/BrokenView' /* webpackChunkName: "broken-view" */));
const ErrorView = React.lazy(() => import('./views/ErrorView' /* webpackChunkName: "error-view" */));

function App() {
	const f = useI18NFormat();
	const {
		i18n: {changeLanguage},
	} = useTranslation();
	const isLoading = useSelector((state) => state.app.isLoading);
	const error = useSelector((state) => state.app.error);
	const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
	const [isUpdateNeeded, handleUpdate, checkUpdate] = useServiceWorker();
	return (
		<Router>
			<Suspense fallback={<Loading />}>
				<ErrorBoundary onError={ErrorView}>
					<div className="App">
						<header className="App-header">
							<img src={reactLogo} className="App-logo" alt="logo" />
							<h1 className="App-title">Welcome to React</h1>
						</header>
						<button onClick={() => changeLanguage('fi')}>{f('fin', 'capitalize')}</button>
						<button onClick={() => changeLanguage('en')}>{f('eng', 'capitalize')}</button>
						<button onClick={() => changeLanguage('sv')}>{f('sve', 'capitalize')}</button>
						<br />
						{isLoading ? 'Fetching API data ..' : ''}
						<br />
						{error ? <h2 style={{color: 'red'}}>Error: {error}</h2> : null}
						<br />
						<div>
							<>
								<div>
									<Link to="/">
										<button>{f('home', 'capitalize')}</button>
									</Link>
									<Link to="/login">
										<button>{f('login', 'capitalize')}</button>
									</Link>
									<Link to="/secret">
										<button disabled={!isLoggedIn}>{f('secret', 'capitalize')}</button>
									</Link>
									<Link to="/broken">
										<button>{f('broken', 'capitalize')}</button>
									</Link>
								</div>
								<br />
								<Suspense fallback={<Loading />}>
									<Routes>
										<Route path="/" element={<HomeView />} />
										<Route path="/login" element={<LoginView />} />
										<Route path="/secret" element={<PrivateComponent isValid={isLoggedIn} failPath="/login" element={<SecretView />} />} />
										<Route path="/broken" element={<BrokenView />} />
										<Route path="/_error" element={<ErrorView error={new Error('demo error')} onClear={() => console.log('reset')} />} />
									</Routes>
								</Suspense>
							</>
						</div>
						<br />
						<b>
							Service Worker: <button onClick={checkUpdate}>Check updates</button>
							<button onClick={() => handleUpdate(true)} disabled={!isUpdateNeeded}>
								Install new version
							</button>
						</b>
					</div>
				</ErrorBoundary>
			</Suspense>
		</Router>
	);
}

export default App;
