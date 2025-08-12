import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = async ({ error, event, status, message }) => {
	return {
		message: 'An unexpected client error occurred.',
		code: 'UNEXPECTED'
	};
};
