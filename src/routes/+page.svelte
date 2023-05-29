<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const taintedMessage: string | null | false =
		'Do you want to leave this page? Changes you made may not be saved.';
	// Client API:
	const { form, errors, constraints, enhance } = superForm(data.form, { taintedMessage });
</script>

<div class="flex justify-center items-center flex-col">
	<h1 class="text-3xl my-2">Homepage</h1>
	<p class="text-base">(Coming soon)</p>
</div>
