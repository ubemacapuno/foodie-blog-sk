<script lang="ts">
	import { fly } from 'svelte/transition';

	export let isAlertShowing: string | boolean | undefined = true;
	export let description = '';
	export let onClose = () => {};

	function closeAlert() {
		onClose();
		isAlertShowing = false;
	}
</script>

{#if isAlertShowing}
	<div transition:fly={{ opacity: 0, y: -50 }} class="alert-wrapper text-sm">
		<div class="flex justify-center alert alert-warning p-2 rounded-none">
			<span>{description}</span>
			<button
				class="btn-close btn btn-xs btn-error rounded-full text-white"
				on:click={closeAlert}
				aria-label="Close Modal Box">X</button
			>
		</div>
	</div>
{/if}
