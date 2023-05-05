import type { FormOptions } from 'sveltekit-superforms/client';
import { sendToast } from '../stores/toast';
import * as flashModule from 'sveltekit-flash-message/client';

/**
 * Super Forms Options
 *
 * ? We want standardized options to make sure we don't have to worry about unnecessary/duplicate options
 *
 */

// Only default options
export const defaultSuperOptions: FormOptions = {
	taintedMessage: 'Are you sure you want to leave this page?',
	scrollToError: 'smooth',
	autoFocusOnError: 'detect',
	errorSelector: '[data-invalid]',
	stickyNavbar: undefined,
	defaultValidator: 'clear',
	syncFlashMessage: false,
	// onError: ({ error }) => {
	// 	console.error('error', error)
	// 	return sendToast(error?.message, 'warning')
	// },
	flashMessage: {
		module: flashModule,
		onError: ({ error }) => {
			console.error('error', error);
			return sendToast(error?.message, 'warning');
		}
	}
};

// Only enhance options
export const onResult = (callback?: (data: any | unknown) => any) => ({
	onResult: ({ result }) => {
		if (result?.type === 'redirect') {
			// sendToast('Redirecting...')
		} else {
			if (result?.type === 'error') {
				console.error(result);
				return sendToast(result.error.message, 'warning');
			}

			if (result?.errors || result?.type === 'failure') {
				console.error('failure', result);
				return sendToast(result.message, 'warning');
			}

			if (result?.type === 'success') {
				sendToast(result.data.form.message, 'success');
			}

			if (callback && 'data' in result && result?.data) {
				callback(result.data.form);
			}
		}
	}
});

export const getSuperOptions = (callback?: (data: any | unknown) => any) => ({
	...defaultSuperOptions,
	...onResult(callback)
});
