import {CacheOptions, cacheMatch, cacheStore} from '@mharj/cache-storage';
import {httpFetch} from './';
import {isOnline} from '../browser';

/**
 * Use ETag cache validation if available (ifNoneMatch: true)
 */
export async function cacheFetch(req: Request, options?: CacheOptions & CacheQueryOptions, cacheName?: string): Promise<Response> {
	const cacheRes = await cacheMatch(req, options, cacheName); // check cached response (and update if-none-match to req if have etag)
	if (isOnline()) {
		const res = await httpFetch(req);
		if (!res.ok && res.status !== 304) {
			throw new Error(`fetch error: ${res.status} ${res.statusText}`);
		}
		if (res.status !== 304) {
			if (req.method === 'GET') {
				await cacheStore(req, res); // update cache Response
			}
			return res;
		}
	}
	if (cacheRes) {
		return cacheRes;
	}
	throw new Error('Browser is offline and no cache entry');
}
