<script lang="ts">
	import { format } from 'date-fns';
	import { page } from '$app/stores';
	import LoginButton from '$lib/components/LoginButton.svelte';

	// Stats props:
	export let totalDishes: Number | String;
	export let totalUsers: Number | String;
	export let featuredDish: String;
	export let cuisine: String;

	const currentDateFormatted = format(new Date(), 'PP');
</script>

<div class="flex flex-col gap-5">
	<div class="stats stats-vertical shadow">
		<h1 class="text-xl my-2">Stats coming soon!</h1>
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
	<div>
		{#if !$page.data.session}
			<LoginButton>Sign In</LoginButton>
		{:else}
			<a class="btn btn-sm btn-secondary" href="/authenticated/dashboard">User Dashboard</a>
		{/if}
	</div>
</div>
