/** 
 * Reference SvelteKit Loading stackblitz 
 @see https://stackblitz.com/edit/sveltekit-cyrrtf?file=src%2Flib%2Floading.ts
 */
import { writable } from 'svelte/store';

/**
 * Store of an object that has a status.
 * The possible statuses are:
 *  - IDLE
 *  - LOADING
 *  - NAVIGATING
 */
const newLoading = () => {
	const { subscribe, update, set } = writable({
		status: 'IDLE'
	});

	function setNavigate(isNavigating: boolean) {
		update(() => {
			return {
				status: isNavigating ? 'NAVIGATING' : 'IDLE'
			};
		});
	}

	function setLoading(isLoading: boolean) {
		update(() => {
			return {
				status: isLoading ? 'LOADING' : 'IDLE'
			};
		});
	}

	return { subscribe, update, set, setNavigate, setLoading };
};

export const loading = newLoading();
