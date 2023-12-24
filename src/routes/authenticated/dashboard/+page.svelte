<script lang="ts">
	import type { PageData } from './$types'
	import { avatarLetters } from '$utilities/helpers'

	export let data: PageData

	//TODO: Make a store or something
	let avatarInitials = 'Me'
	//TODO: Stat Props

	$: ({ user_dishes_length, session, user_restaurants_length } = data)
	$: if (session?.user?.name) avatarInitials = avatarLetters(String(session.user.name))
</script>

<div class="bg-neutral shadow-xl mx-1 rounded-2xl">
	<div class="flex justify-center items-center flex-col">
		<h1 class="text-3xl text-primary font-bold my-2">Dashboard</h1>
		<div class="flex flex-col justify-start items-center">
			<div class="card-body gap-0">
				<div class="avatar self-center">
					{#if session?.user?.image}
						<div
							class="bg-[color-mix(in_oklab,oklch(var(--n)),black_7%)] text-neutral-content rounded-full w-16"
						>
							<img src={session?.user?.image} alt="User avatar." />
						</div>
					{:else}
						<div class="avatar placeholder">
							<div
								class="bg-[color-mix(in_oklab,oklch(var(--n)),black_7%)] text-neutral-content rounded-full w-16"
							>
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

			<div class="stats bg-neutral text-primary-content stats-vertical">
				<div class="stat">
					<div class="stat-title">
						<a href="/authenticated/dishes" class="link link-secondary">Dishes Blogged</a>
					</div>
					<div class="stat-value text-primary">
						{user_dishes_length}
					</div>
				</div>
				<div class="stat">
					<div class="stat-title">
						<a href="/authenticated/restaurants" class="link link-secondary">Restaurants Blogged</a>
					</div>
					<div class="stat-value text-primary">
						{user_restaurants_length}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
