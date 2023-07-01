import type { ActionReturn } from 'svelte/action';
interface Attributes {
	'on:click-outside'?: (event: CustomEvent) => void;
}

interface Parameter {}

export const clickOutside = (node: HTMLElement): ActionReturn<Parameter, Attributes> => {
	const handleClick = (event: MouseEvent) => {
		if (node && !node.contains(event.target as HTMLElement) && !event.defaultPrevented) {
			node.dispatchEvent(
				new CustomEvent('click-outside', { detail: 'Detects a click outside of an element.' })
			);
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
