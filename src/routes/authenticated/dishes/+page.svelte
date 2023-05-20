<script lang="ts">
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { slide, fly } from 'svelte/transition';
	import Switch from '$lib/components/Switch.svelte';
	import { getSuperOptions } from '$lib/forms/superforms';
	import DishProfileForm from './DishProfileForm.svelte';

	export let data: PageData;

	let showDebug = false;

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

	// function addIngredient() {
	// 	if (newIngredient.trim() !== '') {
	// 		$form.ingredients = [...$form.ingredients, newIngredient];
	// 		newIngredient = '';
	// 	} else {
	// 		alert('Ingredient must not be BLANK.');
	// 	}
	// }

	// function removeIngredient(event, index) {
	// 	// stopPropagation prevents form from submitting after deleting items from the ingredient array
	// 	// @see https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
	// 	event.stopPropagation();
	// 	$form.ingredients.splice(index, 1);
	// 	$form.ingredients = $form.ingredients;
	// }

	$: ({ dishes } = data);
</script>

<div class="flex justify-center items-center flex-col">
	<h1 class="text-3xl my-2">Add A Dish:</h1>
	<div class="w-full max-w-xs">
		<DishProfileForm action="?/create" {form} {errors} {constraints} {enhance} />
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
