<script lang="ts">
	import InputLabel from './InputLabel.svelte'

	export let label = ''
	export let error: string | string[] = ''
	export let span = 1 // Grid span
	export let style = ''
	export let required = false
</script>

<label style:--span={span} {style}>
	<span class="text-error">{error ?? ''}</span>
	<slot />
	{#if label}
		<InputLabel {required} {label} />
	{/if}
</label>
