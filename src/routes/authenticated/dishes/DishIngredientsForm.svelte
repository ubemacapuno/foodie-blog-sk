<script lang="ts">
	export let form;
	export let action: string;
	export let errors;
	export let newIngredient;
	export let enhance;
	export let submitText = 'submit';

	function addIngredient() {
		if (newIngredient.trim() !== '') {
			$form.ingredients = [...$form.ingredients, newIngredient];
			newIngredient = '';
		} else {
			alert('Ingredient must not be BLANK.');
		}
	}

	function removeIngredient(event, index) {
		// stopPropagation prevents form from submitting after deleting items from the ingredient array
		// @see https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
		event.stopPropagation();
		$form.ingredients.splice(index, 1);
		$form.ingredients = $form.ingredients;
	}
</script>

<form
	method="POST"
	{action}
	use:enhance
	class="bg-base-300 shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
>
	<div class="mb-4">
		<label class="block text-primary text-sm font-bold mb-2" for="ingredients">Ingredients</label>
		<input
			type="text"
			name="newIngredient"
			class="input input-bordered w-full max-w-xs"
			placeholder="Add ingredients"
			bind:value={newIngredient}
		/>
		<button
			on:click|preventDefault={addIngredient}
			class="btn btn-sm btn-secondary btn-outline py-1 px-2 mt-2">Add</button
		>
		<div>
			{#each $form?.ingredients || [] as ingredient, index}
				<div class="flex items-center mt-2">
					<button
						type="button"
						on:click|preventDefault={(event) => removeIngredient(event, index)}
						class="ml-2 btn btn-error btn-xs">🗑️</button
					>
					<ul class="pl-5">
						<li>
							{ingredient}
						</li>
					</ul>
				</div>
			{/each}
		</div>
		{#if $errors.ingredients && $form?.ingedients?.length > 0}<span class="text-error"
				>{JSON.stringify($errors.ingredients)}</span
			>{/if}
	</div>

	<button type="submit" class="btn btn-sm btn-primary">{submitText}</button>
</form>
