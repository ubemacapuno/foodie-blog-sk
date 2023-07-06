<script lang="ts">
	import type { PageData } from './$types'
	import { superForm } from 'sveltekit-superforms/client'
	import { getSuperOptions } from '$lib/forms/superforms'

	export let data: PageData
	$: ({ restaurants } = data)

	// Client API:
	const { form, errors, constraints, enhance } = superForm(data.form, {
		/**
		 * Spreading getSuperOptions() allows us to sync up our toast messages from the flash library.
		 * @see https://superforms.vercel.app/flash-messages
		 */
		...getSuperOptions(),
		// This is a requirement when the schema contains nested objects:
		dataType: 'json'
	})
</script>
