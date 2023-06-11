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
	<h1 class="text-3xl my-2">Home - Coming Soon!</h1>
	<div class="stats bg-neutral text-primary-content">
		<div class="stat">
			<div class="stat-title">Account balance</div>
			<div class="stat-value text-accent">$89,400</div>
			<div class="stat-actions">
				<button class="btn btn-sm btn-primary">Add funds</button>
			</div>
		</div>

		<div class="stat">
			<div class="stat-title">Current balance</div>
			<div class="stat-value text-accent">$89,400</div>
			<div class="stat-actions">
				<button class="btn btn-sm btn-secondary">Withdrawal</button>
				<button class="btn btn-sm btn-secondary">deposit</button>
			</div>
		</div>
	</div>
</div>
