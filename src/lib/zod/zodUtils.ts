import {z} from 'zod';

export function zodErrorToString(error: z.ZodError): string {
	return error.issues.map((issue) => `${issue.path}: ${issue.message}`).join(', ');
}

export function zodBuildError(response: z.SafeParseError<unknown>): Error {
	return new TypeError(`${zodErrorToString(response.error)}`);
}
