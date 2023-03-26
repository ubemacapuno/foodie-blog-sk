import type { Accent, FontColor, IconName } from '$elements/element-types';

// Accent is the way we map our colors and icons sitewide
type AccentMap = {
	[AccentKey in Accent]: {
		iconName: IconName;
		color: FontColor;
	};
};

export const ACCENT: AccentMap = {
	info: {
		iconName: 'info',
		color: 'primary'
	},
	warning: {
		iconName: 'warning',
		color: 'warning'
	},
	caution: {
		iconName: 'warning',
		color: 'caution'
	}
};
