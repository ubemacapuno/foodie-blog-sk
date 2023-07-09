<script lang="ts">
	import { page } from '$app/stores'
	import LoginButton from '$lib/components/LoginButton.svelte'
	import { signOut } from '@auth/sveltekit/client'
	import Alert from '$lib/components/Alert.svelte'
</script>

<header>
	<div class="navbar bg-neutral" style="display: flex; justify-content: space-between;">
		<div class="mx-0 mobile z-10">
			<div class="dropdown">
				<label tabindex="0" class="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h7"
						/>
					</svg>
				</label>
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box border-2 border-base-content w-52 bg-bg-base-300"
				>
					{#if $page.data.session}
						<li>
							<a
								class:active={$page.url.pathname === '/authenticated/dashboard'}
								class:text-accent={$page.url.pathname === '/authenticated/dashboard'}
								href="/authenticated/dashboard">Home</a
							>
						</li>
						<li>
							<a
								class:active={$page.url.pathname.match(/^\/authenticated\/dishes\/?[0-9a-fA-F]*$/)}
								class:text-accent={$page.url.pathname.match(
									/^\/authenticated\/dishes\/?[0-9a-fA-F]*$/
								)}
								href="/authenticated/dishes">Dishes</a
							>
						</li>
						<li>
							<a
								class:active={$page.url.pathname.match(
									/^\/authenticated\/restaurants\/?[0-9a-fA-F]*$/
								)}
								class:text-accent={$page.url.pathname.match(
									/^\/authenticated\/restaurants\/?[0-9a-fA-F]*$/
								)}
								href="/authenticated/restaurants">Restaurants</a
							>
						</li>
						<li>
							<a
								class:active={$page.url.pathname.match(/^\/authenticated\/help\/?[0-9a-fA-F]*$/)}
								class:text-accent={$page.url.pathname.match(
									/^\/authenticated\/help\/?[0-9a-fA-F]*$/
								)}
								href="/authenticated/help">Help</a
							>
						</li>
					{/if}
					<li>
						<a
							class:active={$page.url.pathname.match(/^\/about\/?[0-9a-fA-F]*$/)}
							class:text-accent={$page.url.pathname.match(/^\/about\/?[0-9a-fA-F]*$/)}
							href="/about">About</a
						>
					</li>
				</ul>
			</div>
			<a href="/" class="flex flex-row flex-nowrap font-bold normal-case text-md logo_link">
				<span class="text-primary">Foodie</span>
				<span class="lowercase text-base-content">blog 🍪</span>
			</a>
		</div>
		<div class="desktop">
			<a href="/" class="flex flex-row flex-nowrap font-bold normal-case text-md logo_link">
				<span class="text-primary">Foodie</span>
				<span class="lowercase text-base-content">blog 🍪</span>
			</a>
			<ul class="menu menu-horizontal px-1">
				{#if $page.data.session}
					<li>
						<a
							class:active={$page.url.pathname === '/authenticated/dashboard'}
							class:text-accent={$page.url.pathname === '/authenticated/dashboard'}
							href="/authenticated/dashboard">Home</a
						>
					</li>
					<li>
						<a
							class:active={$page.url.pathname.match(/^\/authenticated\/dishes\/?[0-9a-fA-F]*$/)}
							class:text-accent={$page.url.pathname.match(
								/^\/authenticated\/dishes\/?[0-9a-fA-F]*$/
							)}
							href="/authenticated/dishes">Dishes</a
						>
					</li>
					<li>
						<a
							class:active={$page.url.pathname.match(
								/^\/authenticated\/restaurants\/?[0-9a-fA-F]*$/
							)}
							class:text-accent={$page.url.pathname.match(
								/^\/authenticated\/restaurants\/?[0-9a-fA-F]*$/
							)}
							href="/authenticated/restaurants">Restaurants</a
						>
					</li>
					<li>
						<a
							class:active={$page.url.pathname.match(/^\/authenticated\/help\/?[0-9a-fA-F]*$/)}
							class:text-accent={$page.url.pathname.match(/^\/authenticated\/help\/?[0-9a-fA-F]*$/)}
							href="/authenticated/help">Help</a
						>
					</li>
				{/if}
				{#if !$page.data.session}
					<li>
						<a
							class:active={$page.url.pathname === '/'}
							class:text-accent={$page.url.pathname === '/'}
							href="/">Home</a
						>
					</li>
				{/if}
				<li>
					<a
						class:active={$page.url.pathname.match(/^\/about\/?[0-9a-fA-F]*$/)}
						class:text-accent={$page.url.pathname.match(/^\/about\/?[0-9a-fA-F]*$/)}
						href="/about">About</a
					>
				</li>
			</ul>
		</div>
		<div>
			{#if $page.data.session}
				{#if $page.data.session.user?.image}
					<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
				{/if}
				<button
					class="btn btn-sm btn-outline btn-secondary link no-underline"
					on:click={() => signOut()}>Logout</button
				>
			{:else}
				<LoginButton>Login</LoginButton>
			{/if}
		</div>
	</div>
	{#if $page.url.pathname === '/authenticated/help'}
		<Alert
			description="The virtual assistant may have occasional delays due to API usage and serverless function timeout limitations of 10 seconds."
		/>
	{:else if $page.url.pathname === '/authenticated/restaurants'}
		<Alert accent="info" description="🛠️ This page is under construction. Check back later!" />
	{/if}
</header>

<style lang="postcss">
	.btn.btn-ghost {
		margin: 0 !important;
	}
	.mobile {
		display: none;
	}

	@media (max-width: 768px) {
		.desktop {
			display: none;
		}

		.mobile {
			display: flex;
		}

		.mobile .btn.btn-ghost {
			margin-left: 1rem;
		}
	}

	.logo_link {
		white-space: nowrap;
	}
</style>
