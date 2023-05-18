<script lang="ts">
	import { dev } from '$app/environment';
	import { isDebugShowing } from '$lib/stores/forms';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import Button from '$elements/Button.svelte';

	/**
	 ** Reusable form wrapper
	 *
	 * Note: 'id' should be passed as a superform option to allow for multiple forms on a page
	 *
	 * If a form wrapper is necessary without Debug or standardized form buttons, use SimpleForm.svelte
	 */

	export let form;
	export let method: 'GET' | 'POST' = 'POST';
	export let action: string = '';

	export let submitText = 'Save';
	export let cancelText = 'Clear';
	export let isCancelShowing = true;
	export let sticky = false;
	export let onCancel = () => {};

	const {
		form: sForm,
		errors,
		enhance,
		delayed,
		message,
		reset,
		empty,
		constraints,
		submitting,
		tainted
	} = form;
</script>

<form {method} {action} class={$$props.class ?? ''} use:enhance>
	<input type="hidden" name="_id" bind:value={$sForm._id} />

	<div class="fields">
		<slot />
	</div>

	<div class="form_buttons" class:sticky>
		{#if isCancelShowing}<Button
				outline="btn-outline"
				on:click={() => {
					reset();
					onCancel();
				}}>{cancelText}</Button
			>{/if}
		<Button type="submit" loading={$submitting || $delayed} disabled={!$tainted}
			>{submitText}</Button
		>
	</div>

	{#if $isDebugShowing && dev}
		<SuperDebug
			data={{
				form: $sForm,
				errors: $errors,
				submitting: $submitting,
				message: $message,
				tainted: $tainted,
				constraints: $constraints,
				delayed: $delayed,
				empty: $empty
			}}
		/>
	{/if}
</form>

<style lang="postcss">
	.form_buttons {
		display: flex;
		justify-content: flex-end;
		gap: var(--gap_small);
		margin-top: var(--gap);

		&.sticky {
			position: sticky;
			bottom: 0;
			background-color: var(--bg_color);
			border-top: var(--line);
			padding: var(--gap_small);
			flex: 0;

			.fields {
				flex: 2;
			}
		}
	}

	.debug_wrapper {
		position: fixed;
		bottom: 0;
		right: 0;
		padding: var(--gap);
	}
</style>
