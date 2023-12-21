<script lang="ts">
	export let form
	export let action: string
	export let errors
	export let constraints
	export let enhance
	export let submitText = 'Submit'
	export let restaurantList: { _id: string; name: string }[]

	let selectedRestaurantId: string = $form.connected_restaurants || ''
</script>

<form
	method="POST"
	{action}
	use:enhance
	class="bg-neutral shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
>
	<input type="hidden" name="_id" bind:value={$form._id} />

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
	</div>

	<button type="submit" class="btn uppercase btn-sm btn-primary">{submitText}</button>
</form>
