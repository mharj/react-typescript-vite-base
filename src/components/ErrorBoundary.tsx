import React, {Component, ElementType /* ErrorInfo */} from 'react';

export interface IErrorProps {
	error: undefined | Error;
	onClear: () => void;
}

export type Props = {
	onError: ElementType<IErrorProps>;
	children: React.ReactNode;
};

interface IState {
	error: Error | undefined;
	hasError: boolean;
}

class ErrorBoundary extends Component<Props, IState> {
	constructor(props: Props) {
		super(props);
		this.state = {
			error: undefined,
			hasError: false,
		};
		this.handleClear = this.handleClear.bind(this);
		this.handleUnhandledRejection = this.handleUnhandledRejection.bind(this);
	}

	componentDidMount() {
		// last resort error handling
		window.addEventListener('unhandledrejection', this.handleUnhandledRejection);
	}

	componentWillUnmount() {
		window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
	}

	public componentDidCatch(error: Error /*  info: ErrorInfo */) {
		this.setState({
			error,
			hasError: true,
		});
	}

	public render() {
		const ErrorView = this.props.onError;
		if (this.state.hasError) {
			return <ErrorView error={this.state.error} onClear={this.handleClear} />;
		}
		return this.props.children;
	}

	private handleUnhandledRejection(event: PromiseRejectionEvent) {
		this.setState({
			error: event.reason,
			hasError: true,
		});
	}

	private handleClear() {
		this.setState({
			error: undefined,
			hasError: false,
		});
	}
}
export default ErrorBoundary;
