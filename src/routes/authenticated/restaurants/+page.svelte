<script lang="ts">
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms/client'
	import { getSuperOptions } from '$lib/forms/superforms'
	import RestaurantProfileForm from './RestaurantProfileForm.svelte'
	import DebugSwitch from '$lib/components/DebugSwitch.svelte'

	export let data: PageData
	$: ({ restaurants } = data)

	// Client API:
	const { form, errors, constraints, enhance } = superForm(data.form, {
		/**
		 * Spreading getSuperOptions() allows us to sync up our toast messages from the flash library.
		 * @see https://superforms.vercel.app/flash-messages
		 */
		...getSuperOptions(),
		// This is a requirement when the schema contains nested objects:
		dataType: 'json'
	})
</script>

<div class="flex justify-center items-center flex-col font-bold">
	<h1 class="text-3xl text-accent my-2">Add A Restaurant</h1>
	<div class="w-full max-w-xs">
		<RestaurantProfileForm action="?/create" {form} {errors} {constraints} {enhance} />
	</div>
</div>

<DebugSwitch form={$form} />

<h2 class="text-2xl text-accent font-bold my-2">Restaurants</h2>
{#each restaurants as restaurant}
	<div class="my-4 card w-80 bg-neutral shadow-xl text-primary self-center">
		<div class="card-body">
			<h3 class="card-title">{restaurant.name}</h3>
			<div class="rating">
				{#each Array.from( { length: Number(restaurant.rating) } ).map((_, i) => i + 1) || [] as rating}
					<input
						type="radio"
						id={`rating_${rating}`}
						name="rating"
						value={rating}
						checked={Number(restaurant.rating) === rating}
						disabled
						class="mask mask-star-2 bg-orange-400 cursor-default"
					/>
				{/each}
			</div>
			<div class="card-actions justify-end">
				<a href="/authenticated/restaurants/{restaurant?._id}" class="btn btn-secondary">View</a>
			</div>
		</div>
	</div>
{:else}
	<EmptyState content="There are currently 0 restaurants." />
{/each}
