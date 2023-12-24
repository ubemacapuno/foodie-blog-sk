<script lang="ts">
	import EmptyState from '$elements/EmptyState.svelte'
	import { formFieldProxy } from 'sveltekit-superforms/client'
	import SearchInput from './SearchInput.svelte'

	/**
	 ** Checklist Input
	 *
	 * Only to be used when we need to display a list of items that can be checked off.
	 *
	 * The value being returned is an array of ids of the items that are checked.
	 *
	 * In the case that an array of objects needs to be returned, use the ObjectChecklistInput component.
	 *
	 */

	type CheckListInputData = {
		_id: string
		name: string
		description?: string
		checked?: boolean
	}

	export let name = ''
	export let formattedData: CheckListInputData[] = []
	export let form

	let filter = ''

	$: filteredData = formattedData.filter((data) =>
		data.name.toLowerCase().includes(filter.toLowerCase())
	)

	const { value, errors } = formFieldProxy(form, name)

	const onCheck = (_id: string) => {
		if ($value?.includes(_id)) {
			$value = $value.filter((item: string) => item !== _id)
		} else {
			$value = [...($value || []), _id]
		}
	}
</script>

<!-- TODO: Create SearchInput component -->
<SearchInput
	bind:filter
	on:filter={(e) => (filter = e.detail.filter)}
	class="max_input_width margin_top"
/>

<fieldset class="margin_top">
	{#each filteredData as data}
		<label class="fieldset-label">
			<input type="checkbox" checked={data.checked} on:change={() => onCheck(data._id)} />
			<span>
				<p>{data.name}</p>
			</span>
		</label>
	{:else}
		<EmptyState content="No items found" />
	{/each}
</fieldset>
{#if $errors}
	<span class="warning_color margin_top smallest_font">
		{#each Object.entries($errors).filter(([key, value]) => value !== undefined) as [key, value]}
			{value}
		{/each}
	</span>
{/if}
