<script lang="ts">
	export let form;
	export let action: string;
	export let errors;
	export let constraints;
	export let enhance;
	export let submitText = 'update';
</script>

<form
	method="POST"
	{action}
	use:enhance
	class="bg-neutral shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
>
	<div class="mb-4">
		<label class="block text-primary text-sm font-bold mb-2" for="instructions">Instructions</label>
		<textarea
			class="textarea textarea-bordered textarea-md w-full h-60"
			placeholder="Instructions"
			name="instructions"
			data-invalid={$errors.instructions}
			bind:value={$form.instructions}
			{...$constraints.instructions}
		/>
	</div>
	<div class="mb-4">
		<label class="block text-primary text-sm font-bold mb-2" for="notes">Notes</label>
		<textarea
			class="textarea textarea-bordered textarea-md w-full h-60"
			placeholder="Additional notes"
			name="notes"
			data-invalid={$errors.notes}
			bind:value={$form.notes}
			{...$constraints.notes}
		/>
	</div>
	<button type="submit" class="btn btn-sm btn-primary">{submitText}</button>
</form>
