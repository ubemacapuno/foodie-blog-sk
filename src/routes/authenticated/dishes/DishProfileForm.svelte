<script lang="ts">
	import { slide, fly } from 'svelte/transition';
	import Switch from '$lib/components/Switch.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let form;
	export let action: string;
	export let errors;
	export let constraints;
	export let enhance;
	export let submitText = 'submit';

	let showDebug = false;
</script>

<form
	method="POST"
	{action}
	use:enhance
	class="bg-base-300 shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
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
	<button
		type="submit"
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
		>{submitText}</button
	>
	<div class="py-2 flex justify-between content-center">
		<span class={showDebug ? 'text-warning' : ''}>Debug</span>
		{#if showDebug}
			<span transition:fly={{ y: 200, duration: 200 }}>👩‍💻</span>
		{/if}
		<Switch bind:checked={showDebug} />
	</div>
	{#if showDebug}
		<div transition:slide|local class="mb-7 px-1">
			<SuperDebug data={$form} />
		</div>
	{/if}
</form>
