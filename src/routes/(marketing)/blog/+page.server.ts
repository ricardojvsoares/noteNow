import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { PostsResponse } from '$lib/types';
import { POSTS_PER_PAGE } from '$lib/constants';

export const load = (async ({ fetch, url }) => {
	const page = +(url.searchParams.get('page') || 1);
	const postsRes = await fetch(
		`https://dummyjson.com/posts?limit=${POSTS_PER_PAGE}&skip=${(page - 1) * POSTS_PER_PAGE}`
	);
	if (!postsRes.ok) {
		error(postsRes.status, 'An error has occurred!');
	}
	return {
		title: 'The Blog',
		description: 'Our blog posts',
		posts: (await postsRes.json()) as PostsResponse,
		postType: Math.random() > 0.5 ? 1 : 2
	};
}) satisfies PageServerLoad;
