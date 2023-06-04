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
	class="bg-base-300 shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
>
	<div class="mb-4">
		<label class="block text-primary text-sm font-bold mb-2" for="serving_size">Serving Size</label>
		<input
			type="number"
			class="input input-bordered w-full max-w-xs"
			name="serving_size"
			data-invalid={$errors.serving_size}
			bind:value={$form.serving_size}
			{...$constraints.serving_size}
		/>
	</div>
	{#if $errors.serving_size}
		<span class="text-error">{JSON.stringify($errors.serving_size)}</span>
	{/if}

	<div class="mb-4">
		<label class="block text-primary text-sm font-bold mb-2" for="prep_time">Prep Time (min)</label>
		<input
			type="number"
			class="input input-bordered w-full max-w-xs"
			name="prep_time"
			data-invalid={$errors.prep_time}
			bind:value={$form.prep_time}
			{...$constraints.prep_time}
		/>
	</div>
	{#if $errors.prep_time}
		<span class="text-error">{JSON.stringify($errors.prep_time)}</span>
	{/if}

	<div class="mb-4">
		<label class="block text-primary text-sm font-bold mb-2" for="cook_time">Cook Time (min)</label>
		<input
			type="number"
			class="input input-bordered w-full max-w-xs"
			name="cook_time"
			data-invalid={$errors.cook_time}
			bind:value={$form.cook_time}
			{...$constraints.cook_time}
		/>
	</div>
	{#if $errors.cook_time}
		<span class="text-error">{JSON.stringify($errors.cook_time)}</span>
	{/if}

	<div class="mb-4">
		<label class="block text-primary text-sm font-bold mb-2" for="calories"
			>Calories per serving (kcal)</label
		>
		<input
			type="number"
			class="input input-bordered w-full max-w-xs"
			name="calories"
			data-invalid={$errors.calories}
			bind:value={$form.calories}
			{...$constraints.calories}
		/>
	</div>
	{#if $errors.calories}
		<span class="text-error">{JSON.stringify($errors.calories)}</span>
	{/if}

	<br />
	<button type="submit" class="btn btn-sm btn-primary">
		{submitText}
	</button>
</form>
