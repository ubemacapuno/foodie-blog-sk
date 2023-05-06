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
			<label for="rating" class="block text-sm font-bold mb-2">Rating:</label>
			<div class="rating">
				{#each Array.from({ length: 5 }).map((_, i) => i + 1) as rating}
					<input
						type="radio"
						id={`rating_${rating}`}
						name="rating"
						value={rating}
						checked={Number(dish.rating) === rating}
						disabled
						class="mask mask-star-2 bg-orange-400 cursor-default"
					/>
				{/each}
			</div>
			<p>Ingredients: {dish.ingredients}</p>
			<p>Instructions: {dish.instructions}</p>
			<p>Cuisine: {dish.cuisine}</p>
			<p>Notes: {dish.notes}</p>

			<form method="POST" action="?/delete" use:enhance>
				<input type="hidden" name="_id" value={$form._id} />
				<div class="btn-group">
					<a href="/authenticated/dishes" class="btn">Back</a>
					<button class="btn">Edit</button>
				</div>
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
