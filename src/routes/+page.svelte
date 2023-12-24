<script lang="ts">
	import type { PageData } from './$types'
	import { format } from 'date-fns'
	import { page } from '$app/stores'
	import LoginButton from '$lib/components/LoginButton.svelte'

	export let data: PageData

	let count_all_dishes_created: number | undefined
	let count_all_restaurants_created: number | undefined
	let date_dish_counter_created: string | undefined | null
	let startDateFormatted = 'Fetching date...'
	let currentDateFormatted = format(new Date(), 'PP')

	$: if (data) {
		;({ count_all_dishes_created, date_dish_counter_created, count_all_restaurants_created } = data)
		if (date_dish_counter_created) {
			startDateFormatted = format(new Date(date_dish_counter_created), 'PP')
		}
	}
</script>

<div class="flex flex-col gap-5">
	<div class="stats stats-vertical shadow">
		<div class="flex flex-row flex-nowrap font-bold normal-case text-md p-2">
			<span class="text-primary">Foodie</span>
			<span class="lowercase text-base-content mr-2">blog</span>
			<span class="text-primary">Analytics</span>
		</div>

		<div class="stat">
			<div class="my-2">
				<div class="text-secondary stat-title">Dishes Blogged</div>
				<div class="stat-value text-accent">{count_all_dishes_created || '-'}</div>
			</div>
			<div class="my-2">
				<div class="text-secondary stat-title">Restaurants Blogged</div>
				<div class="stat-value text-accent">{count_all_restaurants_created || '-'}</div>
			</div>
			<div class="stat-desc">{startDateFormatted} - {currentDateFormatted}</div>
		</div>
	</div>
	<div>
		{#if !$page.data.session}
			<LoginButton>Sign In</LoginButton>
		{:else}
			<a class="btn btn-sm btn-primary" href="/authenticated/dashboard">User Dashboard</a>
		{/if}
	</div>
</div>
