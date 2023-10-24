import {z} from 'zod';
import {isJson, handleHttpCodeHandle} from '../httpFetch/utils';
import {zodBuildError} from './zodUtils';

function assertSchema<T extends z.ZodTypeAny>(schema: T, input: unknown): asserts input is z.infer<T> {
	const result = schema.safeParse(input);
	if (!result.success) {
		throw zodBuildError(result);
	}
}

function devAssertSchema<T extends z.ZodTypeAny>(schema: T, input: unknown): asserts input is z.infer<T> {
	if (process.env.NODE_ENV === 'development') {
		assertSchema(schema, input);
	}
}

/**
 * Validate the response body against the schema and return the JSON payload
 * @example
 * const res = await httpFetch(req);
 * const data = await zodJsonResponse(schema, res);
 * @param schema The Zod schema for the JSON payload
 * @param res The fetch response
 * @returns The JSON payload
 * @throws {UnAuthorizedError} if response is 401
 * @throws {TypeError} if the response is not JSON
 * @throws {Error} for other error response codes
 */
export async function zodJsonResponse<T extends z.ZodTypeAny>(schema: T, res: Response): Promise<z.infer<T>> {
	await handleHttpCodeHandle(res, 'json');
	const data: unknown = isJson(res) ? await res.json() : undefined;
	assertSchema(schema, data);
	return data;
}

/**
 * When NODE_ENV is 'development', validate the response body against the schema and return the JSON payload
 * @example
 * const res = await httpFetch(req);
 * const data = await zodDevJsonResponse(schema, res); // on development, validate the response body against the schema
 * @param schema The Zod schema for the JSON payload
 * @param res The fetch response
 * @returns The JSON payload
 * @throws {UnAuthorizedError} if response is 401
 * @throws {TypeError} if the response is not JSON
 * @throws {Error} for other error response codes
 */
export async function zodDevJsonResponse<T extends z.ZodTypeAny>(schema: T, res: Response): Promise<z.infer<T>> {
	await handleHttpCodeHandle(res, 'json');
	const data: unknown = isJson(res) ? await res.json() : undefined;
	devAssertSchema(schema, data);
	return data;
}

export async function zodJsonParseResponse<T extends z.ZodTypeAny>(schema: T, res: Response): Promise<z.infer<T>> {
	await handleHttpCodeHandle(res, 'json');
	const data: unknown = isJson(res) ? await res.json() : undefined;
	assertSchema(schema, data);
	return data;
}
