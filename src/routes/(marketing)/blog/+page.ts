import type { PageLoad } from './$types';

export const load = (async ({ data }) => {
	const module =
		data.postType === 1 ? await import('./Post.svelte') : await import('./PostSecure.svelte');
	return {
		...data,
		component: module.default
	};
}) satisfies PageLoad;
