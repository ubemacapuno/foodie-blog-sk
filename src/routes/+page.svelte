<script lang="ts">
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const taintedMessage: string | null | false =
		'Do you want to leave this page? Changes you made may not be saved.';
	// Client API:
	const { form, errors, constraints, enhance } = superForm(data.form, { taintedMessage });
</script>

<SuperDebug data={$form} />
<h1>Hello World</h1>
<a class="link link-primary" href="/dishes">Dishes</a>
<h1>sveltekit-superforms</h1>

<div class="w-full max-w-xs">
	<form method="POST" use:enhance class="bg-base-300 shadow-md rounded px-8 pt-6 pb-8 mb-4">
		<div class="mb-4">
			<label class="block text-primary text-sm font-bold mb-2" for="name">Name</label>
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
			<label for="email" class="block text-primary text-sm font-bold mb-2">E-mail</label>
			<input
				type="text"
				name="email"
				data-invalid={$errors.email}
				bind:value={$form.email}
				{...$constraints.email}
				class="input input-bordered w-full max-w-xs"
			/>
			{#if $errors.email}<span class="text-error">{$errors.email}</span>{/if}
		</div>

		<div class="flex items-center justify-between">
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>Submit</button
			>
		</div>
	</form>
</div>
