import type { ActionResult } from '@sveltejs/kit';
import uniqueId from 'lodash.uniqueid';
import { writable } from 'svelte/store';

/**
 * Reference @see https://daisyui.com/components/alert/ for details on alert components.
 * DaisyUI classes examples include:
 * "alert"
 * "alert-info"
 * "alert-success"
 * "alert-warning"
 * "alert-error"
 */
export type AlertType = 'info' | 'success' | 'warning' | 'error';

export type ToastMessage = {
	message: string;
	type?: AlertType;
	id: string;
};

export const toast_enhance = (message: string) => () => {
	return (result: ActionResult): void => {
		form_toast(result, message);
	};
};

export const form_toast = function (result: ActionResult, message: string): void {
	if (result.type === 'success') {
		sendToast(message + ' success!', 'success');
	} else if (result.type === 'error' || result.type === 'failure') {
		sendToast(message + ' failed', 'error');
		console.error(result);
	}
};

export const sendToast = (newMessage: string, type: AlertType = 'info'): void => {
	toastMessages.update((messages) => {
		return [
			...messages,
			{
				message: newMessage,
				type,
				id: uniqueId()
			}
		];
	});

	setTimeout(removeMessage, 3000 + newMessage.length * 50);
};

const removeMessage = () => {
	toastMessages.update((messages) => {
		messages.shift();
		return messages;
	});
};

export const toastMessages = writable<ToastMessage[]>([]);
