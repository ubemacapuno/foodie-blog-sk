<script lang="ts">
	import type { PageData } from './$types';
	import { getSuperOptions } from '$lib/forms/superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import Modal from '$lib/components/Modal.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { format } from 'date-fns';
	import DishIngredientsForm from '../DishIngredientsForm.svelte';
	import DishNotesForm from '../DishNotesForm.svelte';
	import DishProfileForm from '../DishProfileForm.svelte';

	export let data: PageData;

	type ActiveModalId = 'profile' | 'ingredients' | 'notes' | 'debug' | undefined;

	let activeModalId: string | ActiveModalId = undefined;
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

	$: ({ dish } = data);
	$: console.log('DISH', data);
</script>

{#if dish}
	<div class="flex">
		<a href="/authenticated/dishes" class="btn btn-outline btn-secondary btn-sm">←</a>
	</div>
	<div class="my-4 card w-80 bg-base-300 self-center">
		<div class="card-body p-3">
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
							on:click={() => (activeModalId = 'profile')}
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
	<div class="my-4 card w-80 bg-base-300 self-center">
		<div class="card-body p-3">
			<h3 class="card-title text-lg text-primary">Ingredients</h3>
			{#if dish?.ingredients}
				<ul class="pl-6 list-disc">
					{#each dish?.ingredients?.length > 0 ? dish.ingredients : [] as ingredient}
						<li>{ingredient}</li>
					{/each}
				</ul>
			{/if}
			<div class="flex justify-between">
				<button
					on:click={() => (activeModalId = 'ingredients')}
					type="button"
					class="btn btn-sm btn-outline btn-primary"
				>
					{#if dish?.ingredients?.length > 0}
						Edit
					{:else}
						Add
					{/if}
				</button>
			</div>
		</div>
	</div>
	<div class="my-4 card w-80 bg-base-300 self-center">
		<div class="card-body p-3">
			<h3 class="card-title text-lg text-primary">Instructions</h3>
			{#if dish?.instructions?.length > 0}
				<p>{dish?.instructions}</p>
			{:else}
				<p>Empty</p>
			{/if}
			<h3 class="card-title text-lg text-primary">Notes</h3>
			{#if dish?.notes?.length > 0}
				<p>{dish?.notes}</p>
			{:else}
				<p>Empty</p>
			{/if}
			<div class="flex justify-between">
				<button
					on:click={() => (activeModalId = 'notes')}
					type="button"
					class="btn btn-sm btn-outline btn-primary"
				>
					{#if dish?.ingredients?.length > 0}
						Edit
					{:else}
						Add
					{/if}
				</button>
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
<button on:click={() => (activeModalId = 'debug')} type="button">👩‍💻</button>
<Modal bind:isModalOpen={activeModalId}>
	{#if activeModalId === 'profile'}
		<DishProfileForm
			submitText="Update"
			action="?/update"
			{form}
			{errors}
			{constraints}
			{enhance}
		/>
	{:else if activeModalId === 'ingredients'}
		<DishIngredientsForm action="?/update" {form} {errors} {newIngredient} {enhance} />
	{:else if activeModalId === 'notes'}
		<DishNotesForm action="?/update" {form} {errors} {constraints} {enhance} />
	{:else if activeModalId === 'debug'}
		<SuperDebug data={$form} />
	{/if}
</Modal>
