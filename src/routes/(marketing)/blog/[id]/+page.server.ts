// import type { PageLoad } from './$types';

import Rect from '$lib/rect.js';
import type { Post, PostComment } from '$lib/types.js';
import { error } from '@sveltejs/kit';
// import type { EntryGenerator } from './$types.js';

export const prerender = 'auto';

export const load = async ({ params, fetch, depends }) => {
	// await parent();
	depends('blog:single_page');

	// if (Math.random() > 0.5) {
	// 	error(500, 'Network error');
	// }
	async function fetchPost() {
		const postRes = await fetch(`https://dummyjson.com/posts/${params.id}`);
		if (postRes.status !== 200) {
			error(postRes.status, { message: 'Failed to load post.', code: 'ERROR_CODE' });
		}
		const postResJSON: Post = await postRes.json();
		return postResJSON;
	}

	async function fetchComments() {
		const postCommentsRes = await fetch(`https://dummyjson.com/posts/${params.id}/comments`);
		const commentsArray: PostComment[] = postCommentsRes.ok
			? (await postCommentsRes.json()).comments
			: [];
		return commentsArray;
	}
	const commentsPromise = fetchComments();
	const post = await fetchPost();
	return {
		comments: commentsPromise,
		post,
		title: post.title,
		description: post.body.slice(0, 200),
		rect: new Rect(0, 0, 100, 100)
	};
};

// export const entries: EntryGenerator = async () => {
// 	return [{ id: '6' }, { id: '7' }];
// };
