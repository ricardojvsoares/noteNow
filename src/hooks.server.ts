import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle1: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');

	if (!token && event.route.id?.startsWith('/(app)')) {
		redirect(307, '/signin');
	}

	event.locals.user = token ? { name: 'Ricardo', id: 1 } : null;

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('%sveltekit.lang%', event.cookies.get('lang') || 'en');
		},
		filterSerializedResponseHeaders: (name) => {
			return name === 'content-type';
		}
	});
	return response;
};

export const handle = sequence(handle1);

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	return {
		event,
		error,
		status,
		message,
		code: 'UNEXPECTED'
	};
};
