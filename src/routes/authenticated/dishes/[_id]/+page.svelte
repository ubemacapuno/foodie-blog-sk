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
	import ConfirmDeleteButton from '$lib/components/ConfirmDeleteButton.svelte';
	import DishNumbersForm from '../DishNumbersForm.svelte';

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
		...getSuperOptions(() => {
			activeModalId = undefined;
		}),
		// This is a requirement when the schema contains nested objects:
		dataType: 'json'
	});
	const userEmail = data.session?.user?.email;

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		/**
		 * "P" is long localized date
		 * "p" is long localized time
		 * @see https://date-fns.org/v2.30.0/docs/format
		 */
		return format(date, 'Pp');
	}

	// TODO: conditionally set "add" or "update" for button text
	let updateButtonText = '';
	let enableButton = false;

	$: {
		if (userEmail === dish?.created_by_user_email) {
			updateButtonText = 'update';
			enableButton = true;
		} else {
			enableButton = false;
		}
	}

	$: ({ dish } = data);
</script>

{#if dish}
	<div class="flex">
		<a href="/authenticated/dishes" class="btn btn-outline btn-secondary btn-sm">←</a>
	</div>
	<div class="flex-container">
		<div>
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
						<p class="text-accent text-xs">
							*Updated {formatDate(dish.date_updated)}
						</p>
					{/if}
					<div class="flex justify-between">
						<form>
							<div class="flex justify-between">
								{#if enableButton}
									<button
										on:click={() => (activeModalId = 'profile')}
										type="button"
										class="btn btn-sm btn-primary"
									>
										{updateButtonText}</button
									>
								{/if}
							</div>
						</form>
						{#if enableButton}
							<ConfirmDeleteButton
								description="Are you sure you want to delete {dish.name}?"
								action="?/delete"
								_id={$form._id}>Delete</ConfirmDeleteButton
							>
						{/if}
					</div>
				</div>
			</div>

			<div class="my-4 card w-80 bg-base-300 self-center">
				<div class="card-body p-3">
					<div>
						{#if dish?.prep_time}
							Prep Time: {dish?.prep_time} min
						{:else}
							<EmptyState content="Preparation time not yet provided." />
						{/if}
					</div>

					<div>
						{#if dish?.cook_time}
							Cook Time: {dish?.cook_time} min
						{:else}
							<EmptyState content="Cooking time not yet provided." />
						{/if}
					</div>

					<div>
						{#if dish?.serving_size}
							Serving size: {dish?.serving_size}
						{:else}
							<EmptyState content="Serving size not specified." />
						{/if}
					</div>

					<div>
						{#if dish?.calories}
							Calories per serving: {dish?.calories} kcal
						{:else}
							<EmptyState content="Calorie count is currently unknown." />
						{/if}
					</div>

					<div class="flex justify-between">
						{#if enableButton}
							<button
								on:click={() => (activeModalId = 'numbers')}
								type="button"
								class="btn btn-sm btn-primary"
							>
								{updateButtonText}
							</button>
						{/if}
					</div>
				</div>
			</div>

			<div class="my-4 card w-80 bg-base-300 self-center">
				<div class="card-body p-3">
					<h3 class="card-title text-lg text-primary">Ingredients</h3>
					{#if dish?.ingredients?.length > 0}
						<ul class="pl-6 list-disc">
							{#each dish?.ingredients || [] as ingredient}
								<li>{ingredient}</li>
							{/each}
						</ul>
					{:else}
						<EmptyState content="There are no ingredients." />
					{/if}
					<div class="flex justify-between">
						{#if enableButton}
							<button
								on:click={() => (activeModalId = 'ingredients')}
								type="button"
								class="btn btn-sm btn-primary"
							>
								{updateButtonText}
							</button>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<div class="my-4 card w-80 bg-base-300 self-start">
			<div class="card-body p-3">
				<h3 class="card-title text-lg text-primary">Instructions</h3>
				{#if dish?.instructions?.length > 0}
					<p>{@html dish?.instructions}</p>
				{:else}
					<EmptyState content="There are no instructions." />
				{/if}
				<h3 class="card-title text-lg text-primary">Notes</h3>
				{#if dish?.notes?.length > 0}
					<p>{@html dish?.notes}</p>
				{:else}
					<EmptyState content="There are no notes." />
				{/if}
				<div class="flex justify-between">
					{#if enableButton}
						<button
							on:click={() => (activeModalId = 'notes')}
							type="button"
							class="btn btn-sm btn-primary"
						>
							{updateButtonText}
						</button>
					{/if}
				</div>
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
<button
	class="btn btn-sm btn-outline btn-accent"
	on:click={() => (activeModalId = 'debug')}
	type="button">👩‍💻 Debugger</button
>
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
	{:else if activeModalId === 'numbers'}
		<DishNumbersForm action="?/update" {form} {errors} {constraints} {enhance} />
	{:else if activeModalId === 'debug'}
		<SuperDebug data={$form} />
	{/if}
</Modal>

<style>
	.flex-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	@media (min-width: 768px) {
		/* CSS rules to apply when screen width is 768 pixels or higher */
		.flex-container {
			display: flex;
			flex-direction: row;
			align-items: start;
			gap: 1rem;
		}
	}
</style>
