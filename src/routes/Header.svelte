<script lang="ts">
	import { page } from '$app/stores';

	let userTheme = 'dark';
	const submitUpdateTheme = ({ action }) => {
		const theme = action.searchParams.get('theme');
		userTheme = theme;
		if (theme) {
			document.documentElement.setAttribute('data-theme', theme);
		}
	};
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
						href="/dishes">Dishes</a
					>
				</li>
			</ul>
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
