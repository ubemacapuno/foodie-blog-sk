<script lang="ts">
	import Form from '$lib/forms/Form.svelte'
	import Input from '$lib/forms/Input.svelte'
	import { superForm } from 'sveltekit-superforms/client'
	import { getSuperOptions } from '$lib/forms/superforms'

	export let action: string
	export let DishesForm
	// close modal after submission
	export let onClose = () => {}

	const form = superForm(DishesForm, { ...getSuperOptions(onClose), dataType: 'json' })
</script>e
