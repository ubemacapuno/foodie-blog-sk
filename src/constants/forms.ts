import { toTitleCase } from '$utilities/transform';

export const DEFAULT_FORM_ERROR = 'There was an error submitting the form. Please try again.';

export const DEFAULT_FORM_SUCCESS = 'Form submitted successfully.';

export const CHECK_FORM_MESSAGE = 'Please check your form for errors.';

export const AUTH_ERROR_MESSAGE = 'You are not authorized to perform this action.';

export const getSuccessMessage = (
	name = '',
	type: 'updated' | 'created' | 'deleted' = 'updated'
) => {
	return `${toTitleCase(name)} ${type} successfully.`;
};
