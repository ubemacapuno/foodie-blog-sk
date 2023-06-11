<script lang="ts">
	import { page } from '$app/stores';
	import { avatarLetters } from '$utilities/helpers';

	//Stat Props:
	export let totalDishes: Number | String;
	export let totalUserDishes: Number | String;

	const avatarInitials = avatarLetters(String($page.data.session?.user?.name));
</script>

<div class="flex justify-center items-center flex-col">
	<h1 class="text-3xl my-2">Your Dashboard - Coming Soon!</h1>
	<div class="flex flex-col justify-start items-start">
		<div class="card-body p-0 gap-0">
			<div class="avatar">
				{#if $page.data.session?.user?.image}
					<div class="w-24 rounded-xl">
						<img src={$page.data.session?.user?.image} alt="User avatar." />
					</div>
				{:else}
					<div class="bg-neutral-focus text-neutral-content rounded-full w-16">
						<span class="text-xl">{avatarInitials}</span>
					</div>
				{/if}
			</div>
			<p>
				<span class="text-primary">{$page.data.session?.user?.name ?? 'Username Not Found'}</span>
			</p>
			<p>
				<span class="text-secondary">{$page.data.session?.user?.email ?? 'Email Not Found'}</span>
			</p>
		</div>

		<div class="stats bg-neutral text-primary-content">
			<div class="stat">
				<div class="stat-title">Total Dishes</div>
				<div class="stat-value text-primary">{totalDishes || '-'}</div>
				<div class="stat-actions">
					<button disabled class="btn btn-sm btn-primary">View</button>
				</div>
			</div>

			<div class="stat">
				<div class="stat-title">Your Dishes</div>
				<div class="stat-value text-accent">{totalUserDishes || '-'}</div>
				<div class="stat-actions">
					<button disabled class="btn btn-sm btn-secondary">View</button>
					<button disabled class="btn btn-sm btn-secondary">Create</button>
				</div>
			</div>
		</div>
	</div>
</div>
