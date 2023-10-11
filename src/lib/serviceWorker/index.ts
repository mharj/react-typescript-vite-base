import {registerSW} from 'virtual:pwa-register';

/**
 * store all useNeedRefresh hook callbacks to call when the service worker need to refresh the page
 */
const setStatusCallback = new Set<() => void>();

let swUpdateCallback: (() => Promise<void>) | undefined = undefined;

/**
 * register a callback to get the service worker onNeedRefresh callback
 * @param cb
 */
export function regSwUpdateCallback(cb: () => void) {
	setStatusCallback.add(cb);
}

/**
 * unregister a callback to get the service worker onNeedRefresh callback
 * @param cb
 */
export function unRegSwUpdateCallback(cb: () => void) {
	setStatusCallback.delete(cb);
}

/**
 * function to trigger check if service worker have update.s
 * @returns ```false``` if service worker callback is not registered.
 */
export async function runUpdateCallback(): Promise<boolean> {
	if (swUpdateCallback) {
		await swUpdateCallback();
		return true;
	}
	return false;
}

/**
 * single registerSW callbacks to get the service worker onNeedRefresh callback
 */
export const handleSwUpdate = registerSW({
	onNeedRefresh() {
		setStatusCallback.forEach((cb) => cb());
	},
	onRegistered: (registration) => {
		if (registration) {
			swUpdateCallback = () => registration.update();
		}
	},
});
