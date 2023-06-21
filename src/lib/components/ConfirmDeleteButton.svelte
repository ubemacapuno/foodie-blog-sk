<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { getSuperOptions } from '$lib/forms/superforms';
	import ConfirmDeleteModal from './ConfirmDeleteModal.svelte';

	// Modal Props
	export let isModalOpen = false;
	export let title = 'Confirm Delete';
	export let description = 'Are you sure you want to delete this?';

	// Form props
	export let action: string;
	export let _id: string; // data _id

	// Button props
	export let disabled = false;

	const { enhance, submitting, delayed } = superForm(
		_id,
		getSuperOptions(() => {
			isModalOpen = false;
		})
	);
</script>

<button
	on:click={() => {
		isModalOpen = true;
	}}
	{disabled}
	class="btn btn-sm btn-outline btn-error"
>
	<slot />
</button>

<ConfirmDeleteModal bind:isModalOpen {title}>
	<div class="bg-neutral">
		<p>{description}</p>
		<form method="POST" {action} use:enhance>
			<input type="hidden" name="_id" value={_id} />
			<button
				class="btn btn-sm btn-outline btn-secondary"
				on:click|preventDefault={() => {
					isModalOpen = false;
				}}
			>
				Cancel
			</button>
			<!-- 
				 preventDefault is a Svelte modifier which calls event.preventDefault() before running the handler. In this case, it will prevent the form from being submitted when you click the "Cancel" button, thus preventing the dish from being deleted.
				 @see docs https://svelte.dev/tutorial/event-modifiers
			-->
			<Button
				type="submit"
				class="btn btn-sm btn-outline btn-error"
				loading={$submitting || $delayed}>Delete</Button
			>
		</form>
	</div>
</ConfirmDeleteModal>
