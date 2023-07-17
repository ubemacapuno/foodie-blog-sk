<script lang="ts">
	import LoginButton from '$lib/components/LoginButton.svelte'
</script>

<div class="card bg-neutral">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl text-error font-bold">Unauthorized!</h1>
			<p class="py-6 text-warning">You are not authorized to access this page! Please sign in.</p>
			<LoginButton>Login</LoginButton>
		</div>
	</div>
</div>
