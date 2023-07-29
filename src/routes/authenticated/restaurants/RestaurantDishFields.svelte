<script lang="ts">
	import { initialDish } from '$constants/restaurants'
	import { toTitleCase } from '$utilities/transform'

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

	<Input {form} field="emails[{index}].email" type="email" placeholder="name@company.com" />
	<Select
		field="emails[{index}].type"
		{form}
		placeholder="Select Email Type"
		options={[...company_email_array.map((type) => ({ value: type, label: toTitleCase(type) }))]}
	/>
	{#if $sForm.emails[index].type === 'other'}
		<Input label="Other Type" {form} field="emails[{index}].other_type" placeholder="Other Type" />
	{/if}
{/each}
