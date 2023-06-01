<script>
	import { signIn } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import LoginButton from '$lib/components/LoginButton.svelte';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="bg-base-300 shadow-xl mx-1">
	<div class="card-body">
		<h1 class="text-3xl font-bold">
			About <span class="text-accent">Foodie</span><span class="lowercase text-base-content"
				>Blog 🍪</span
			>
		</h1>

		<p>
			By <a
				rel="noreferrer noopener"
				class="no-underline link link-secondary"
				href="https://coreydamocles.netlify.app/"
				target="_blank">Corey Damocles</a
			>
		</p>

		<p class="pt-6 pb-3 text-left">
			FoodieBlog is a full-stack application that allows users to record and save recipes. There
			will also be a feature to rate/review dishes from restaurants so that you have a record of
			dishes you've already tried.
		</p>
		<p class="py-3 text-left">
			I'm tired of going to the same ad-infested website to look up recipes, so I decided to make
			this app to make it easy to record and read dishes I want to cook.
		</p>
		<p class="py-3 text-left">
			This application is a complete overhaul of my <a
				class="link link-accent"
				href="https://github.com/ubemacapuno/foodie-blog">original FoodieBlog</a
			> application, which was developed using Embedded JavaScript (EJS), Node (Express), and MongoDB.
		</p>
		{#if !$page.data.session}
			<h1 class="text-xl text-warning font-bold">Please sign in!</h1>
			<LoginButton>Sign In</LoginButton>
		{:else}
			<a href="/" class="my-6 btn btn-primary">Dashboard</a>
		{/if}
	</div>
</div>
