<script lang="ts">
	import { toTitleCase } from '$utilities/transform'

	export let label: string
	export let required = false

	const formattedLabel = (string = '') => {
		// if the label is a path separated string then we take the very last part
		const newPath = string.split(',').pop() ?? string

		return toTitleCase(newPath)
	}
</script>

<span class="text-small">
	{formattedLabel(label)}{#if required} *{/if}
</span>
