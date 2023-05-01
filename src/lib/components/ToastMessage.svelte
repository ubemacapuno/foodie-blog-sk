<script lang="ts">
	import { fly } from 'svelte/transition';
	import { toastMessages } from '$lib/stores/toast';
</script>

<div class="toast z-10">
	{#each $toastMessages as toastMessage (toastMessage.id)}
		<div
			class={`toast-message alert alert-${toastMessage.type}`}
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
