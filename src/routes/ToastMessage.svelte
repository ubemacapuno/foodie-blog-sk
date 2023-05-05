<script lang="ts">
	import { fly } from 'svelte/transition';
	import { toastMessages } from '$lib/stores/toast';
	import { STATUS } from '$constants/status';
	import { initFlash } from 'sveltekit-flash-message/client';
	import { page } from '$app/stores';

	// ? Toast messages that are used when redirecting on the server
	const flashMessages = initFlash(page);
	const flashTimeoutMs = 3000;

	let flashTimeout: ReturnType<typeof setTimeout>;

	$: if ($flashMessages) {
		clearTimeout(flashTimeout);

		flashTimeout = setTimeout(() => ($flashMessages = []), flashTimeoutMs);
	}
</script>

<div class="toast">
	{#each $toastMessages
		.concat($flashMessages || [])
		.filter(Boolean) as toastMessage (toastMessage.id)}
		<div
			class={`alert alert-${toastMessage.status}`}
			transition:fly={{ y: 0, duration: 400, x: -200 }}
		>
			<p>{toastMessage.message}</p>
		</div>
	{/each}
</div>

<style>
	.alert-info::before {
		content: 'ℹ️';
	}
	.alert-success::before {
		content: '👍';
	}
	.alert-warning::before,
	.alert-error::before {
		content: '⚠️';
	}
</style>
