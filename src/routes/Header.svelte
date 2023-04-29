<script lang="ts">
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
</script>

<header>
	<div class="navbar bg-base-300">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">
				<span class="text-primary">Foodie</span>
				<span class="lowercase text-base-content">blog 🍪</span>
			</a>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal px-1">
				<li>
					<a class:active={$page.url.pathname === '/'} class="text-accent" href="/">Home</a>
				</li>
				<li>
					<a
						class:active={$page.url.pathname.match(/^\/dishes\/?[0-9a-fA-F]*$/)}
						class="text-accent"
						href="/authenticated/dishes">Dishes</a
					>
				</li>
			</ul>
		</div>
		<div class="navbar-end">
			{#if $page.data.session}
				{#if $page.data.session.user?.image}
					<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
				{/if}
				<button
					class="btn btn-sm btn-outline btn-secondary link no-underline"
					on:click={() => signOut()}>Logout</button
				>
			{:else}
				<button
					class="btn btn-sm btn-outline btn-primary link no-underline"
					on:click={() => signIn('github')}>Login</button
				>
			{/if}
		</div>
	</div>
</header>

<style lang="postcss">
	.light::before {
		content: 🌙;
		width: 30px;
		height: 30px;
	}

	.dark::before {
		content: 🌙;
		width: 30px;
		height: 30px;
	}
</style>
