import {UnAuthorizedError} from './UnAuthorizedError';

/**
 * Handle common backend http response codes
 * @param res
 */
export function handleHttpCodeHandle(res: Response, expectType?: 'json'): Promise<void> {
	switch (res.status) {
		case 200: // OK
		case 201: // Created
		case 202: {
			// Accepted
			if (expectType === 'json' && !isJson(res)) {
				throw new TypeError('Fatal: Response type is not JSON');
			}
			break;
		}
		case 204: // No Content
		case 304: // Not Modified
			break;
		case 401: {
			throw new UnAuthorizedError('Unauthorized');
		}
		default:
			// TODO: build async buildError(res) to handle API error JSON payload
			throw new Error(`${res.status} ${res.statusText}`);
	}
	return Promise.resolve();
}

/**
 * Check response have 'application/json' content type header.
 */
export function isJson(res: Response): boolean {
	return res.headers.get('Content-type')?.startsWith('application/json') || false;
}
