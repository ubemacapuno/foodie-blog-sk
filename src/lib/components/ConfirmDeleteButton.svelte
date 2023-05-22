<script lang="ts">
	import Modal from './Modal.svelte';
	import Button from '$elements/Button.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { getSuperOptions } from '$lib/forms/superforms';
	import ConfirmDeleteModal from './ConfirmDeleteModal.svelte';

	// Modal Props
	export let isConfirmActive = false;
	export let title = 'Confirm Delete';
	export let description = 'Are you sure you want to delete this?';

	// Form props
	export let action: string;
	export let _id: string; // data _id

	// Button props
	export let disabled = false;

	const { enhance, submitting, delayed } = superForm(_id, getSuperOptions());
</script>

<button
	on:click={() => {
		isConfirmActive = true;
	}}
	{disabled}
	class="btn btn-sm btn-outline btn-error"
>
	<slot />
</button>

<ConfirmDeleteModal bind:isModalOpen={isConfirmActive} {title}>
	<div class="bg-neutral">
		<p>{@html description}</p>
		<form method="POST" {action} use:enhance>
			<input type="hidden" name="_id" value={_id} />
			<button
				class="btn btn-sm btn-outline btn-secondary"
				on:click={() => {
					isConfirmActive = false;
				}}
			>
				Cancel
			</button>
			<button
				type="submit"
				class="btn btn-sm btn-outline btn-error"
				loading={$submitting || $delayed}>Delete</button
			>
		</form>
	</div>
</ConfirmDeleteModal>
