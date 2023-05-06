<script lang="ts">
	import { fly } from 'svelte/transition';
	import { toastMessages } from '$lib/stores/toast';
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
		<!--
			TODO:
			Should be able to replace logic so that the class is 'alert-{toastMessage.status}, but there is a bug. Keep the current conditional statements for now.
			For example, the following is not working: class={`alert alert-${toastMessage.status}`}
		-->

		<div
			class={`alert ${
				toastMessage.status === 'info'
					? 'alert-info'
					: toastMessage.status === 'success'
					? 'alert-success'
					: toastMessage.status === 'warning'
					? 'alert-warning'
					: toastMessage.status === 'error'
					? 'alert-error'
					: ''
			}`}
			transition:fly={{ y: 0, duration: 400, x: -200 }}
		>
			{#if toastMessage.status === 'success'}
				<span class="emoji">👍</span>
			{:else if toastMessage.status === 'warning' || toastMessage.status === 'error'}
				<span class="emoji">⛔️</span>
			{:else}
				<span class="emoji">ℹ️</span>
			{/if}
			<p>{toastMessage.message}</p>
		</div>
	{/each}
</div>
