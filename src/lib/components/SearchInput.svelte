<script lang="ts">
	import { S } from '$constants/searchParams'
	import debounce from 'lodash.debounce'

	export let filter: string = ''
	export let onChange: ({ name, value }: { name: string; value: string }) => void
	export let placeholder = 'Search...'

	const handleSearch = debounce(() => onChange({ name: S, value: filter }), 300)
</script>

<input
	{placeholder}
	type="text"
	bind:value={filter}
	on:input={handleSearch}
	class={`search_input ${$$props.class ?? ''}`}
/>
