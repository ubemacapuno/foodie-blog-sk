<script lang="ts">
	export let form;
	export let errors;
	export let constraints;
	export let enhance;
</script>

<form
	method="POST"
	action="?/create"
	use:enhance
	class="bg-base-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
>
	<div class="mb-4">
		<label class="block text-primary text-sm font-bold mb-2" for="instructions">Instructions</label>
		<textarea
			class="textarea textarea-bordered textarea-md"
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
			class="textarea textarea-bordered textarea-md"
			placeholder="Additional notes"
			name="notes"
			data-invalid={$errors.notes}
			bind:value={$form.notes}
			{...$constraints.notes}
		/>
	</div>
	<button
		type="submit"
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
		>Submit</button
	>
</form>
