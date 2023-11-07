import React from 'react';
import {Helmet} from 'react-helmet-async';
import {IErrorProps} from '../components/ErrorBoundary';
import {useThunkDispatch} from '../reducers';
import {resetAction} from '../reducers/common';
import {useI18NFormat} from '../hooks/useI18NFormat';
import {useNavigate} from 'react-router';

const ErrorView: React.FC<IErrorProps> = ({onClear, error}) => {
	const nav = useNavigate();
	const f = useI18NFormat();
	const dispatch = useThunkDispatch();
	const handleReset = () => {
		onClear(); // clear error state
		dispatch(resetAction()); // reset redux
		nav('/'); // navigate to home
	};
	return (
		<div>
			<Helmet>
				<title>Error</title>
			</Helmet>
			<div className="App-intro">
				<h1 style={{color: 'red'}}>{f('fatal_error', 'capitalize')}</h1>
				<h2>{error ? error.message : null}</h2>
				<button onClick={handleReset}>{f('reset', 'capitalize')}</button>
			</div>
		</div>
	);
};

export default ErrorView;
