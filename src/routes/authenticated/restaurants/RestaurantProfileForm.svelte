<script lang="ts">
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
</form>
