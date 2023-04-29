import lodash from 'lodash';
const { startCase, camelCase } = lodash;

export function toTitleCase(str = '') {
	return startCase(camelCase(str));
}
