<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { format } from 'date-fns';

	export let data: PageData;
	// Stats props:
	export let totalDishes: Number | String;
	export let totalUsers: Number | String;
	export let featuredDish: String;
	export let cuisine: String;

	const currentDateFormatted = format(new Date(), 'PP');
	const taintedMessage: string | null | false =
		'Do you want to leave this page? Changes you made may not be saved.';
	// Client API:
	const { form, errors, constraints, enhance } = superForm(data.form, { taintedMessage });
</script>

<div class="stats stats-vertical shadow">
	<h1 class="text-3xl my-2">Home - Coming Soon!</h1>

	<div class="stat">
		<div class="text-primary stat-title">Total Dishes</div>
		<div class="stat-value text-primary">{totalDishes || '-'}</div>
		<div class="stat-desc">Mar 25, 2023 - {currentDateFormatted}</div>
	</div>

	<div class="stat">
		<div class="text-secondary stat-title">Total Users</div>
		<div class="stat-value text-secondary">{totalUsers || '-'}</div>
		<div class="stat-desc">Mar 25, 2023 - {currentDateFormatted}</div>
	</div>

	<div class="stat">
		<div class="text-accent stat-title">Featured Dish</div>
		<div class="stat-value text-accent">{featuredDish || '-'}</div>
		<div class="stat-desc">
			{cuisine || '-'}
		</div>
	</div>
</div>
