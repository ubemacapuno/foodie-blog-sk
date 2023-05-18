import { writable } from 'svelte/store';

/**
 ** Field Array

 * ? Helper used to create a field array for forms. Can be used with one or multiple fields at a time.
 * NOTE: be sure to preface 'fields' with $ when using in a svelte component
 * 
 * @param initialValue - initial value of the array
 * @param defaultValue - default value to add to the array (usually one empty instance of the type)
 */

export function useFieldArray<T>(initialValue: T[], defaultValue: T) {
	const fields = writable(initialValue);

	const add = () => fields.update((arr) => [...arr, defaultValue]);

	const remove = (index: number) => fields.update((arr) => arr.filter((_, i) => i !== index));

	return {
		fields,
		add,
		remove
	};
}

export function useFieldArrayWithFlags<T>(initialValue: T[], defaultValue: T) {
	const fields = writable(initialValue);

	const add = () => fields.update((arr) => [...arr, { ...defaultValue, added: true }]);
	const remove = (id: string) =>
		fields.update((arr) => {
			if (arr.find((item) => item._id === id && item.added)) {
				return arr.filter((item) => item._id !== id);
			}
			return arr.map((item) =>
				item._id === id && !item.added
					? { ...item, deleted: true, added: false, edited: false }
					: item
			);
		});
	const setEdit = (id: string) =>
		fields.update((arr) => {
			return arr.map((item) =>
				item._id === id && !item.added && !item.deleted ? { ...item, edited: true } : item
			);
		});

	return {
		fields,
		add,
		remove,
		setEdit
	};
}

export function useToggleArrayWithFlags<T>(initialValue: T[]) {
	const fields = writable(initialValue);

	const checkBox = (id: string) =>
		fields.update((arr) =>
			arr.map((item) => {
				if (item._id === id) {
					if (item.checked) {
						return item.added
							? { ...item, added: false, checked: false }
							: { ...item, deleted: true, checked: false };
					}
					return item.deleted
						? { ...item, deleted: false, checked: true }
						: { ...item, added: true, checked: true };
				}
				return item;
			})
		);

	return {
		fields,
		checkBox
	};
}

// Toggle debug mode from anywhere
export const isDebugShowing = writable(false);

export const toggleDebug = () => isDebugShowing.update((val) => !val);
