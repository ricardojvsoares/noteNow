import { type Handle, type HandleServerError } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { auth } from '$lib/server/auth';

const authHandle: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({
		headers: event.request.headers
	});
	if (session) {
		event.locals.session = session;
	}
	return svelteKitHandler({ event, resolve, auth });
};

export const handle1: Handle = async ({ event, resolve }) => {
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

export const handle = sequence(handle1, authHandle);

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	return {
		message: 'An unexpected error occurred.',
		code: 'UNEXPECTED'
	};
};
