<script lang="ts">
	import type { PageData } from './$types';
	import { avatarLetters } from '$utilities/helpers';

	//TODO: Make a store or something
	let avatarInitials = 'Me';
	//TODO: Stat Props
	let totalDishes: Number | String;

	$: ({ user_dishes_length, session } = data);
	$: if (session?.user?.name) avatarInitials = avatarLetters(String(session.user.name));

	export let data: PageData;
</script>

<div class="bg-neutral shadow-xl mx-1 rounded-2xl">
	<div class="flex justify-center items-center flex-col">
		<h1 class="text-3xl text-primary font-bold my-2">Dashboard</h1>
		<div class="flex flex-col justify-start items-center">
			<div class="card-body gap-0 my-5">
				<div class="avatar self-center">
					{#if session?.user?.image}
						<div class="bg-neutral-focus text-neutral-content rounded-full w-16">
							<img src={session?.user?.image} alt="User avatar." />
						</div>
					{:else}
						<div class="avatar placeholder">
							<div class="bg-neutral-focus text-neutral-content rounded-full w-16">
								<span class="text-xl text-primary">{avatarInitials}</span>
							</div>
						</div>
					{/if}
				</div>
				<p class="text-center">
					<span class="text-neutral-content">{session?.user?.name ?? 'Username Not Found'}</span>
				</p>
				<p class="text-center">
					<span class="text-secondary text-xs">{session?.user?.email ?? 'Email Not Found'}</span>
				</p>
			</div>

			<div class="stats bg-neutral text-primary-content my-5">
				<div class="stat">
					<div class="stat-title">Total Dishes</div>
					<div class="stat-value text-primary">{totalDishes || '-'}</div>
					<div class="stat-actions">
						<button disabled class="btn btn-sm btn-primary">View</button>
					</div>
				</div>

				<div class="stat">
					<div class="stat-title">Your Dishes</div>
					<div class="stat-value text-accent">{user_dishes_length}</div>
					<div class="stat-actions">
						<a class="btn btn-sm btn-secondary" href="/authenticated/dishes">View</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
