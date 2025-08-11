<script lang="ts">
	import { page } from '$app/state';
	import { BProgress } from '@bprogress/core';
	import '@bprogress/core/css';
	import '../app.css';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	BProgress.configure({ showSpinner: false });
	let { children } = $props();

	let loadingTimeout: number;

	beforeNavigate(() => {
		// @ts-ignore
		loadingTimeout = setTimeout(() => {
			BProgress.start();
		}, 500);
	});
	afterNavigate(() => {
		BProgress.done();
		clearTimeout(loadingTimeout);
	});
</script>

<svelte:head>
	<title>{page.data.title ? `${page.data.title} | NoteNow` : 'NoteNow'}</title>
	<meta
		property="og:title"
		content={page.data.title ? `${page.data.title} | NoteNow` : 'NoteNow'}
	/>
	<meta
		property="og:description"
		content={page.data.title ? `${page.data.description} | NoteNow` : 'NoteNow'}
	/>
	<meta name="description" content="Some description" />
</svelte:head>

{@render children()}
