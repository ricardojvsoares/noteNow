<script lang="ts">
	import { page } from '$app/state';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>{page.params.authType === 'register' ? 'Sign Up' : 'Sign In'}</h1>
