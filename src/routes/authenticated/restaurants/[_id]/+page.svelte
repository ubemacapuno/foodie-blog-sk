<script lang="ts">
	import type { PageData } from './$types'
	import { formatDate } from '$utilities/helpers'
	import { getSuperOptions } from '$lib/forms/superforms'
	import { superForm } from 'sveltekit-superforms/client'
	import ConfirmDeleteButton from '$lib/components/ConfirmDeleteButton.svelte'
	import type { ActiveModalId } from '$lib/forms/form-types'
	import RestaurantProfileForm from '../RestaurantProfileForm.svelte'
	import Modal from '$lib/components/Modal.svelte'

	export let data: PageData

	let activeModalId: string | ActiveModalId = undefined
	// TODO: conditionally set "add" or "update" for button text
	let updateButtonText = ''
	let enableButton = false
	// Client API:
	const { form, errors, constraints, enhance } = superForm(data.form, {
		/**
		 * Spreading getSuperOptions() allows us to sync up our toast messages from the flash library.
		 * @see https://superforms.vercel.app/flash-messages
		 */
		...getSuperOptions(() => {
			activeModalId = undefined
		}),
		// This is a requirement when the schema contains nested objects:
		dataType: 'json'
	})
	const userEmail = data.session?.user?.email

	$: {
		if (userEmail === restaurant?.created_by_user_email) {
			updateButtonText = 'Update'
			enableButton = true
		} else {
			enableButton = false
		}
	}

	$: ({ restaurant } = data)
</script>

{#if restaurant}
	<div class="flex">
		<a href="/authenticated/restaurants" class="btn uppercase btn-outline btn-secondary btn-sm">←</a
		>
	</div>
{/if}
<div class="flex-container">
	<div class="my-4 card w-80 bg-neutral self-center">
		<div class="card-body p-3">
			<h3 class="card-title text-2xl text-primary">
				{restaurant.name}
			</h3>
			<label for="rating" class="block text-sm font-bold mb-2">Rating:</label>
			<div class="rating">
				{#each Array.from({ length: 5 }).map((_, i) => i + 1) || [] as rating}
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
			<p>Added {formatDate(restaurant.date_added)}</p>
			<p class="text-info">
				***Planning to add a feature for adding restaurant dishes with notes and ratings!
			</p>
			{#if restaurant?.date_updated !== restaurant?.date_added}
				<p class="text-accent text-xs">
					*Updated {formatDate(restaurant.date_updated)}
				</p>
			{/if}
			<div class="flex justify-between">
				<form>
					<div class="flex justify-between">
						{#if enableButton}
							<button
								on:click={() => (activeModalId = 'profile')}
								type="button"
								class="btn uppercase btn-sm btn-primary"
							>
								{updateButtonText}</button
							>
						{/if}
					</div>
				</form>
				{#if enableButton}
					<ConfirmDeleteButton
						description="Are you sure you want to delete {restaurant.name}?"
						action="?/delete"
						_id={$form._id}>Delete</ConfirmDeleteButton
					>
				{/if}
			</div>
		</div>
	</div>
</div>
<Modal bind:isModalOpen={activeModalId}>
	{#if activeModalId === 'profile'}
		<RestaurantProfileForm
			submitText="Update"
			action="?/update"
			{form}
			{errors}
			{constraints}
			{enhance}
		/>
	{/if}
</Modal>
