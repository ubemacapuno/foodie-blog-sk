<script lang="ts">
	import type { PageData } from './$types';
	import { getSuperOptions } from '$lib/forms/superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import Modal from '$lib/components/Modal.svelte';
	import { slide, fly } from 'svelte/transition';
	import Switch from '$lib/components/Switch.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { format } from 'date-fns';

	export let data: PageData;

	let showDebug = false;
	let newIngredient = '';

	// Client API:
	const { form, errors, constraints, enhance } = superForm(data.form, {
		/**
		 * Spreading getSuperOptions() allows us to sync up our toast messages from the flash library.
		 * @see https://superforms.vercel.app/flash-messages
		 */
		...getSuperOptions(),
		// This is a requirement when the schema contains nested objects:
		dataType: 'json'
	});

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		/**
		 * "P" is long localized date
		 * "p" is long localized time
		 * @see https://date-fns.org/v2.30.0/docs/format
		 */
		return format(date, 'Pp');
	}
	function addIngredient() {
		if (newIngredient.trim() !== '') {
			$form.ingredients = [...$form.ingredients, newIngredient];
			newIngredient = '';
		} else {
			alert('Ingredient must not be BLANK.');
		}
	}

	function removeIngredient(index) {
		$form.ingredients.splice(index, 1);
		$form.ingredients = $form.ingredients;
	}

	let isEditModalOpen = false;

	$: ({ dish } = data);
	$: console.log('DISH');
</script>

{#if dish}
	<div class="my-4 card w-80 bg-base-300 self-center">
		<div class="card-body p-3">
			<div class="flex">
				<a href="/authenticated/dishes" class="btn btn-outline btn-secondary btn-sm">←</a>
			</div>
			<h3 class="card-title text-2xl text-primary">
				{dish.name}
			</h3>
			<label for="rating" class="block text-sm font-bold mb-2">Rating:</label>
			<div class="rating">
				{#each Array.from({ length: 5 }).map((_, i) => i + 1) || [] as rating}
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
			<p>Cuisine: {dish.cuisine}</p>
			{#if dish.ingredients}
				<p>Ingredients:</p>
				<ul class="pl-6 list-disc">
					{#each dish.ingredients || [] as ingredient}
						<li>{ingredient}</li>
					{/each}
				</ul>
			{/if}
			{#if dish.instructions}
				<p>Instructions: {dish.instructions}</p>
			{/if}
			{#if dish.notes}
				<p>Notes: {dish.notes}</p>
			{/if}
			<p>Added {formatDate(dish.date_added)}</p>
			{#if dish?.date_updated !== dish?.date_added}
				<p class="text-secondary">
					*Updated {formatDate(dish.date_updated)}
				</p>
			{/if}

			<div class="flex justify-between">
				<form>
					<div class="flex justify-between">
						<button
							on:click={() => (isEditModalOpen = true)}
							type="button"
							class="btn btn-sm btn-outline btn-primary">Edit</button
						>
					</div>
				</form>

				<form method="POST" action="?/delete" use:enhance>
					<input type="hidden" name="_id" value={$form._id} />
					<button type="submit" class="btn btn-sm btn-outline btn-error">Delete</button>
				</form>
			</div>
		</div>
	</div>
{:else}
	<div class="card w-72 bg-base-300 shadow-xl">
		<div class="card-body">
			<strong class="text-warning text-3xl">Oops! Dish not found.</strong>
			<a class="mt-5 btn btn-secondary" href="authenticated/dishes">Back to dishes</a>
		</div>
	</div>
{/if}
<Modal bind:isModalOpen={isEditModalOpen}>
	{#if isEditModalOpen}
		<form
			method="POST"
			action="?/update"
			use:enhance
			class="bg-base-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
			on:submit|preventDefault={() => (isEditModalOpen = false)}
		>
			<input type="hidden" name="_id" bind:value={$form._id} />
			<div class="mb-4">
				<label class="block text-primary text-sm font-bold mb-2" for="name">Dish Name</label>
				<input
					type="text"
					name="name"
					class="input input-bordered w-full max-w-xs"
					data-invalid={$errors.name}
					bind:value={$form.name}
					{...$constraints.name}
				/>
				{#if $errors.name}<span class="text-warning">{$errors.name}</span>{/if}
			</div>
			<label for="rating" class="block text-primary text-sm font-bold mb-2">Rating</label>
			<div class="mb-6 rating">
				<div class="flex justify-center items-center">
					<input
						type="radio"
						name="rating"
						value="1"
						checked={$form.rating === '1'}
						on:change={() => ($form.rating = '1')}
						class="mask mask-star-2 bg-orange-400"
					/>
					<input
						type="radio"
						name="rating"
						value="2"
						checked={$form.rating === '2'}
						on:change={() => ($form.rating = '2')}
						class="mask mask-star-2 bg-orange-400"
					/>
					<input
						type="radio"
						name="rating"
						value="3"
						checked={$form.rating === '3'}
						on:change={() => ($form.rating = '3')}
						class="mask mask-star-2 bg-orange-400"
					/>
					<input
						type="radio"
						name="rating"
						value="4"
						checked={$form.rating === '4'}
						on:change={() => ($form.rating = '4')}
						class="mask mask-star-2 bg-orange-400"
					/>
					<input
						type="radio"
						name="rating"
						value="5"
						checked={$form.rating === '5'}
						on:change={() => ($form.rating = '5')}
						class="mask mask-star-2 bg-orange-400"
					/>
				</div>
				{#if $errors.rating}<span class="text-error">{$errors.rating}</span>{/if}
			</div>
			<div class="mb-4">
				<label class="block text-primary text-sm font-bold mb-2" for="cuisine">Cuisine</label>
				<input
					type="text"
					name="cuisine"
					class="input input-bordered w-full max-w-xs"
					data-invalid={$errors.cuisine}
					bind:value={$form.cuisine}
					{...$constraints.cuisine}
				/>
			</div>
			<div class="mb-4">
				<label class="block text-primary text-sm font-bold mb-2" for="ingredients"
					>Ingredients</label
				>
				<input
					type="text"
					name="newIngredient"
					class="input input-bordered w-full max-w-xs"
					placeholder="Add ingredients"
					bind:value={newIngredient}
				/>
				<button on:click|preventDefault={addIngredient} class="btn-primary btn py-1 px-2 mt-2"
					>Add</button
				>
				<div>
					{#each $form.ingredients || [] as ingredient, index}
						<div class="flex items-center mt-2">
							<span>{ingredient}</span>
							<button on:click={() => removeIngredient(index)} class="ml-2 btn btn-error btn-xs"
								>🗑️</button
							>
						</div>
					{/each}
				</div>
				{#if $errors.ingredients}<span class="text-error"
						>{JSON.stringify($errors.ingredients)}</span
					>{/if}
			</div>
			<div class="mb-4">
				<label class="block text-primary text-sm font-bold mb-2" for="instructions"
					>Instructions</label
				>
				<textarea
					class="textarea textarea-bordered textarea-md"
					placeholder="Instructions"
					name="instructions"
					data-invalid={$errors.instructions}
					bind:value={$form.instructions}
					{...$constraints.instructions}
				/>
			</div>
			<div class="mb-4">
				<label class="block text-primary text-sm font-bold mb-2" for="notes">Notes</label>
				<textarea
					class="textarea textarea-bordered textarea-md"
					placeholder="Additional notes"
					name="notes"
					data-invalid={$errors.notes}
					bind:value={$form.notes}
					{...$constraints.notes}
				/>
			</div>
			<div class="flex items-center justify-between">
				<button
					type="submit"
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>Submit</button
				>
			</div>
		</form>
		<div class="p-1 pb-4 flex justify-between content-center">
			<span class={showDebug ? 'text-warning' : ''}>Form Debugger</span>
			<Switch bind:checked={showDebug} />
		</div>
		{#if showDebug}
			<div transition:slide|local class="mb-7">
				<SuperDebug data={$form} />
			</div>
		{/if}
	{/if}
</Modal>
