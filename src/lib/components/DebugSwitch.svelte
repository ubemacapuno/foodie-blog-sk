<script lang="ts">
	import { slide, fly } from 'svelte/transition';
	import Switch from '$lib/components/Switch.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let form;

	let showDebug = false;
</script>

<div class="py-2 flex justify-between content-center">
	<span class={showDebug ? 'text-warning' : ''}>Debugger</span>
	{#if showDebug}
		<span transition:fly={{ y: 200, duration: 200 }}>👩‍💻</span>
	{/if}
	<Switch bind:checked={showDebug} />
</div>
{#if showDebug}
	<div transition:slide|local class="mb-7 px-1">
		<SuperDebug data={form} />
	</div>
{/if}
