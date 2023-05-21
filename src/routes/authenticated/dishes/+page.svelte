<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { getSuperOptions } from '$lib/forms/superforms';
	import DishProfileForm from './DishProfileForm.svelte';
	import DebugSwitch from '$lib/components/DebugSwitch.svelte';

	export let data: PageData;

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
	$: ({ dishes } = data);
</script>

<div class="flex justify-center items-center flex-col">
	<h1 class="text-3xl my-2">Add A Dish:</h1>
	<div class="w-full max-w-xs">
		<DishProfileForm action="?/create" {form} {errors} {constraints} {enhance} />
	</div>
</div>

<DebugSwitch form={$form} />

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
