import {useCallback, useEffect, useState} from 'react';
import {handleSwUpdate, regSwUpdateCallback, runUpdateCallback, unRegSwUpdateCallback} from '.';

/**
 * Service Worker hook to get update status, update function and check update function
 * @returns ```[haveUpdate: boolean, update: (reload?: boolean) => Promise<void>, checkUpdate: () => Promise<boolean>]```
 */
export function useServiceWorker(): [boolean, (reloadPage?: boolean | undefined) => Promise<void>, () => Promise<boolean>] {
	const [haveUpdate, setNeedRefresh] = useState(false);

	/**
	 * build callback which we can add and remove from the setStatusCallback Set (mount and unmount)
	 */
	const handleStatusUpdate = useCallback(() => {
		setNeedRefresh(true);
	}, []);

	/**
	 * add and remove the callback to the setStatusCallback Set
	 */
	useEffect(() => {
		regSwUpdateCallback(handleStatusUpdate);
		return () => {
			unRegSwUpdateCallback(handleStatusUpdate);
		};
	}, [handleStatusUpdate]);
	return [haveUpdate, handleSwUpdate, runUpdateCallback];
}
