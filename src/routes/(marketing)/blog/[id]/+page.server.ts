import { error } from '@sveltejs/kit';
import type { Post, PostComment } from '$lib/types';
import type { PageLoad } from '../$types';

export const load: PageLoad = async ({ params, fetch }) => {
	async function fetchPost() {
		const postRes = await fetch(`https://dummyjson.com/posts/${params.id}`);
		if (postRes.status !== 200) {
			error(postRes.status, 'Failed to load post.');
		}
		const postResJSON: Post = await postRes.json();
		return postResJSON;
	}

	async function fetchComments() {
		const PostComment = await fetch(`https://dummyjson.com/posts/${params.id}/comments`);
		if (PostComment.status !== 200) {
			error(PostComment.status, {
				message: 'Failed to load post comments.',
				code: 'ERROR_CODE'
			});
		}
		const commentsArray: PostComment[] = PostComment.ok ? (await PostComment.json()).comments : [];
		return commentsArray;
	}

	const commentsPromise = fetchComments();
	const post = await fetchPost();
	return {
		comments: commentsPromise,
		post,
		title: post.title,
		description: post.body.slice(0, 200)
	};
};
