<script lang="ts">
	import type { PageData } from './$types';
	import { getSuperOptions } from '$lib/forms/superforms';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	// Client API:
	const { form, enhance } = superForm(data.form, getSuperOptions());

	$: ({ dish } = data);
	$: console.log('DISH', dish);
</script>

{#if dish}
	<div class="my-4 card w-80 bg-base-300 self-center">
		<div class="card-body p-3">
			<h3 class="card-title text-primary">
				{dish.name}
			</h3>
			<p>Rating: {dish.rating}</p>
			<p>Ingredients: {dish.ingredients}</p>
			<p>Instructions: {dish.instructions}</p>
			<p>Cuisine: {dish.cuisine}</p>
			<p>Notes: {dish.notes}</p>

			<form method="POST" action="?/delete" use:enhance>
				<input type="hidden" name="_id" value={$form._id} />
				<button type="submit" class="btn">Delete</button>
			</form>
		</div>
	</div>
{:else}
	<div class="card w-72 bg-base-300 shadow-xl">
		<div class="card-body">
			<strong class="text-warning text-3xl">Oops! Dish not found.</strong>
			<a class="mt-5 btn btn-secondary" href="authenticated/dishes">Back to capas</a>
		</div>
	</div>
{/if}
