import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './configureStore.ts';
import {HelmetProvider} from 'react-helmet-async';
import './index.css';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<PersistGate loading={<div>loading</div>} persistor={persistor}>
				<HelmetProvider>
					<App />
				</HelmetProvider>
			</PersistGate>
		</ReduxProvider>
	</React.StrictMode>,
);
