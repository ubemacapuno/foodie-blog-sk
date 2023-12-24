<script lang="ts">
	import { Restaurant } from '$db/models/restaurants/schema'
	import ChecklistInput from '$lib/components/ChecklistInput.svelte'
	import { superForm } from 'sveltekit-superforms/client'
	import { getSuperOptions } from '$lib/forms/superforms'

	// export let form
	// export let errors
	// export let constraints
	// export let restaurantList: { _id: string; name: string }[]
	export let dishRestaurantForm
	export let action: string
	export let enhance
	export let submitText = 'Submit'
	export let all_restaurants: Restaurant[] = []

	// close modal after submission
	export let onClose = () => {}

	// let selectedRestaurantId: string = $form.connected_restaurants || ''

	const formattedData = all_restaurants?.map(({ name, _id }) => ({
		name,
		_id,
		// Apply checked box if mapped operation is the same as connected_operation
		checked: !!dishRestaurantForm.data.connected_operations?.find(
			(operation: string) => operation === _id
		)
	}))

	const form = superForm(dishRestaurantForm, {
		...getSuperOptions(onClose),
		dataType: 'json'
	})
</script>

<form
	method="POST"
	{action}
	use:enhance
	class="bg-neutral shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
>
	<!-- <input type="hidden" name="_id" bind:value={$form._id} />

	<div class="mb-4">
		<label class="block text-primary text-sm font-bold mb-2" for="restaurant"
			>Select Restaurant</label
		>
		<select
			name="connected_restaurants"
			class="select select-bordered w-full max-w-xs"
			bind:value={selectedRestaurantId}
		>
			<option disabled selected value="">Select a Restaurant</option>
			{#each restaurantList as restaurant}
				<option value={restaurant._id}>{restaurant.name}</option>
			{/each}
		</select>
	</div> -->
	<ChecklistInput name="connected_restaurants" {formattedData} {form} />

	<button type="submit" class="btn uppercase btn-sm btn-primary">{submitText}</button>
</form>
