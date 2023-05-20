<script lang="ts">
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { slide, fly } from 'svelte/transition';
	import Switch from '$lib/components/Switch.svelte';
	import { getSuperOptions } from '$lib/forms/superforms';

	export let data: PageData;

	let showDebug = false;
	let newIngredient = '';

	// Client API:
	const form = superForm(companyForm, { ...getSuperOptions(), dataType: 'json' });
	// const { form, errors, constraints, enhance } = superForm(data.form, {
	// 	/**
	// 	 * Spreading getSuperOptions() allows us to sync up our toast messages from the flash library.
	// 	 * @see https://superforms.vercel.app/flash-messages
	// 	 */
	// 	...getSuperOptions(),
	// 	// This is a requirement when the schema contains nested objects:
	// 	dataType: 'json'
	// });

	function addIngredient() {
		if (newIngredient.trim() !== '') {
			$form.ingredients = [...$form.ingredients, newIngredient];
			newIngredient = '';
		} else {
			alert('Ingredient must not be BLANK.');
		}
	}

	function removeIngredient(event, index) {
		// stopPropagation prevents form from submitting after deleting items from the ingredient array
		// @see https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
		event.stopPropagation();
		$form.ingredients.splice(index, 1);
		$form.ingredients = $form.ingredients;
	}

	$: ({ dishes } = data);
</script>

<div class="flex justify-center items-center flex-col">
	<h1 class="text-3xl my-2">Add A Dish:</h1>
	<div class="w-full max-w-xs">
		<!-- <form
			method="POST"
			action="?/create"
			use:enhance
			class="bg-base-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
							<button
								type="button"
								on:click|preventDefault={(event) => removeIngredient(event, index)}
								class="ml-2 btn btn-error btn-xs">🗑️</button
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
		</form> -->
		<div class="py-2 flex justify-between content-center">
			<span class={showDebug ? 'text-warning' : ''}>Form Debugger</span>
			{#if showDebug}
				<span transition:fly={{ y: 200, duration: 200 }}>🍪</span>
			{/if}
			<Switch bind:checked={showDebug} />
		</div>
		{#if showDebug}
			<div transition:slide|local class="mb-7 px-1">
				<SuperDebug data={$form} />
			</div>
		{/if}
	</div>
</div>

{#each dishes as dish}
	<div class="my-4 card w-80 bg-base-300 shadow-xl text-primary self-center">
		<div class="card-body">
			<h3 class="card-title">{dish.name}</h3>
			<div class="card-actions justify-end">
				<a href="/authenticated/dishes/{dish?._id}" class="btn btn-primary">View</a>
			</div>
		</div>
	</div>
{/each}
