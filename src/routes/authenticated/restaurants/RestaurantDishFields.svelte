<script lang="ts">
	import { initialDish } from '$constants/restaurants'
	import Input from '$lib/forms/Input.svelte'

	export let form

	let { form: sForm } = form

	const addRestaurantDish = () => {
		sForm.update((prev) => {
			prev.dishes.push({ ...initialDish })
			return prev
		})
	}

	const removeRestaurantDish = (index) => {
		sForm.update((prev) => {
			prev.dishes.splice(index, 1)
			return prev
		})
	}
</script>

<h3>Dishes</h3>
{#if $sForm.dishes.length < 20}
	<Button on:click={addRestaurantDish} iconName="add">Add Email</Button>
{/if}

<!-- Need grid component here -->
{#each $sForm.emails as _, index}
	<!-- Need Card component here-->>
	{#if $sForm.emails?.length > 1}
		<!-- Need Flex component here -->
		<button name="close" on:click={() => removeRestaurantDish(index)} />
	{/if}
	<Input {form} field="dishes[{index}].name" type="text" placeholder="Italian Beef" />
	<Input {form} field="dishes[{index}].rating" type="text" placeholder="5" />
	<Input
		{form}
		field="dishes[{index}].description"
		type="textarea"
		placeholder="Enter description of dish..."
	/>
	<Input {form} field="dishes[{index}].notes" type="textarea" placeholder="Enter dish notes..." />
{/each}
