<script lang="ts">
	import RestaurantDishFields from './RestaurantDishFields.svelte'

	export let form
	export let action: string
	export let errors
	export let constraints
	export let enhance
	export let delayed = null
	export let submitText = 'submit'
</script>

<form
	method="POST"
	{action}
	use:enhance
	class="bg-neutral shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
>
	<input type="hidden" name="_id" bind:value={$form._id} />
	<div class="mb-4">
		<label class="block text-primary text-sm font-bold mb-2" for="name">Restaurant Name</label>
		<input
			type="text"
			name="name"
			class="bg-base-100 input input-bordered w-full max-w-xs"
			data-invalid={$errors.name}
			bind:value={$form.name}
			{...$constraints.name}
		/>
		{#if $errors.name}<span class="text-warning">{$errors.name}</span>{/if}
	</div>
	<label for="rating" class="block text-primary text-sm font-bold mb-2">Rating</label>
	<div class="mb-6 rating">
		<div class="flex justify-center items-center">
			<input
				type="radio"
				name="rating"
				value="1"
				checked={$form.rating === '1'}
				on:change={() => ($form.rating = '1')}
				class="mask mask-star-2 bg-orange-400"
			/>
			<input
				type="radio"
				name="rating"
				value="2"
				checked={$form.rating === '2'}
				on:change={() => ($form.rating = '2')}
				class="mask mask-star-2 bg-orange-400"
			/>
			<input
				type="radio"
				name="rating"
				value="3"
				checked={$form.rating === '3'}
				on:change={() => ($form.rating = '3')}
				class="mask mask-star-2 bg-orange-400"
			/>
			<input
				type="radio"
				name="rating"
				value="4"
				checked={$form.rating === '4'}
				on:change={() => ($form.rating = '4')}
				class="mask mask-star-2 bg-orange-400"
			/>
			<input
				type="radio"
				name="rating"
				value="5"
				checked={$form.rating === '5'}
				on:change={() => ($form.rating = '5')}
				class="mask mask-star-2 bg-orange-400"
			/>
		</div>
		{#if $errors.rating}<span class="text-error">{$errors.rating}</span>{/if}
	</div>
	<br />
	<button type="submit" class="btn btn-sm btn-primary">{submitText}</button>
	{#if $delayed}<span class="delayed">Working...</span>{/if}
</form>
