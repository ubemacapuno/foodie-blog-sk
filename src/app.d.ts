// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { ToastMessage } from '$lib/stores/toast';

declare namespace App {
	// interface Error {}
	// interface Locals {}
	interface PageData {
		flash?: ToastMessage[];
	} // interface Platform {}
}
