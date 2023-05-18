export type Shortcut = {
	key?: string;
	control?: boolean;
	shift?: boolean;
	alt?: boolean;
};

/* Hotkey characters */
export let NOTES_SHORTCUT = { key: '/', control: true };
export let SEARCH_SHORTCUT = { key: 'k', control: true };
export let SIDEBAR_SHORTCUT = { key: 's', control: true };
export let DEBUG_SHORTCUT = { key: 'b', control: true };

// ? Determine the meta key for the current OS
const getMetaKey = () => {
	if (typeof navigator !== 'undefined' && navigator?.userAgent?.indexOf('Mac OS X') != -1) {
		return '⌘';
	} else {
		return 'Ctrl';
	}
};

export const SHIFT_KEY = `⇧`;

export const getShortcutHtml = (shortcut: Shortcut, text = '') => {
	let html = '';
	if (shortcut.control) html += `<span class="hotkey">${getMetaKey()}</span>`;
	if (shortcut.shift) html += `<span class="hotkey">${SHIFT_KEY}</span>`;
	if (shortcut.alt) html += `<span class="hotkey">⌥</span>`;
	if (shortcut.key) html += `<span class="hotkey">${shortcut.key}</span>`;
	return `<div class="hotkeys"><span>${text}</span>${html}</div>`;
};
