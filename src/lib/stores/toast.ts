import type { Status } from '$elements/element-types';
import uniqueId from 'lodash.uniqueid';
import { writable } from 'svelte/store';

export type ToastMessage = {
	message: string;
	status?: Status;
	id: string;
};

export const sendToast = (newMessage: string, status: Status = 'info'): void => {
	toastMessages.update((messages) => {
		return [
			...messages,
			newMessage && {
				message: newMessage,
				status,
				id: uniqueId()
			}
		].filter((message) => message?.message);
	});

	setTimeout(removeMessage, 3000 + (newMessage?.length || 0) * 50);
};

const removeMessage = () => {
	toastMessages.update((messages) => {
		messages.shift();
		return messages;
	});
};

export const toastMessages = writable<ToastMessage[]>([]);
