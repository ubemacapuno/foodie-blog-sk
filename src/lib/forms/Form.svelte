<script lang="ts">
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

	const { form: sForm, enhance, delayed, reset, submitting, tainted } = form;
</script>

<form
	{method}
	{action}
	class="bg-base-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
	{...$$restProps}
	use:enhance
>
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
</form>
