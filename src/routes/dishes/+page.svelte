<script lang="ts">
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { dishes_schema } from '$db/models/dishes/schema';
	import { slide, fly } from 'svelte/transition';
	import Switch from '$lib/components/Switch.svelte';

	export let data: PageData;

	let showDebug = false;
	// Client API:
	const { form, errors, constraints, enhance } = superForm(data.form, {
		taintedMessage: 'Please make sure to fill out all required fields before leaving this page!',
		validators: dishes_schema
	});
</script>

<div class="flex justify-center items-center flex-col">
	<h1 class="text-3xl my-2">Blog</h1>
	<h3 class="text-lg my-2">Form for adding dishes:</h3>
	<div class="w-full max-w-xs">
		<form method="POST" use:enhance class="bg-base-300 shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
				{#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
			</div>
			<div class="mb-6">
				<label for="rating" class="block text-primary text-sm font-bold mb-2">Rating</label>
				<input
					type="text"
					name="rating"
					data-invalid={$errors.rating}
					bind:value={$form.rating}
					{...$constraints.rating}
					class="input input-bordered w-full max-w-xs"
				/>
				{#if $errors.rating}<span class="text-error">{$errors.rating}</span>{/if}
			</div>

			<div class="flex items-center justify-between">
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>Submit</button
				>
			</div>
		</form>
		<div class="py-2 flex justify-between content-center">
			<span class={showDebug ? 'text-warning' : ''}>Form Debugger</span>
			{#if showDebug}
				<span transition:fly={{ y: 200, duration: 200 }}>🍪</span>
			{/if}
			<Switch bind:checked={showDebug} />
		</div>
		{#if showDebug}
			<div transition:slide|local>
				<SuperDebug data={$form} />
			</div>
		{/if}
	</div>
</div>
