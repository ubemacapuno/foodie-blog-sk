<script lang="ts">
	import Modal from './Modal.svelte';
	import Button from '$elements/Button.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { getSuperOptions } from '$lib/forms/superforms';

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

<Button
	accent="warning"
	iconName="delete"
	on:click={() => {
		isConfirmActive = true;
	}}
	{disabled}
>
	<slot />
</Button>

<Modal bind:isModalOpen={isConfirmActive} {title} maxWidth="28rem">
	<div class="padding">
		<p>{@html description}</p>
		<form method="POST" {action} use:enhance>
			<input type="hidden" name="_id" value={_id} />
			<Button
				outline="btn-outline"
				on:click={() => {
					isConfirmActive = false;
				}}
			>
				Cancel
			</Button>
			<Button type="submit" accent="warning" loading={$submitting || $delayed}>Delete</Button>
		</form>
	</div>
</Modal>
