<script lang="ts">
	import type { PageData } from './$types'
	import { format } from 'date-fns'
	import { page } from '$app/stores'
	import LoginButton from '$lib/components/LoginButton.svelte'

	export let data: PageData

	let count_all_dishes_created: number | undefined
	let date_created: string | undefined | null
	let startDateFormatted = 'Fetching date...'
	let currentDateFormatted = format(new Date(), 'PP')

	$: if (data) {
		;({ count_all_dishes_created, date_created } = data)
		if (date_created) {
			startDateFormatted = format(new Date(date_created), 'PP')
		}
	}
</script>

<div class="flex flex-col gap-5">
	<div class="stats stats-vertical shadow">
		<h1 class="text-xl my-2">More stats coming soon!</h1>
		<div class="stat">
			<div class="text-primary stat-title">Total Dishes Created</div>
			<div class="stat-value text-primary">{count_all_dishes_created || '-'}</div>
			<div class="stat-desc">{startDateFormatted} - {currentDateFormatted}</div>
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
