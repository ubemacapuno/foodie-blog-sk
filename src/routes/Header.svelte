<script lang="ts">
	import { page } from '$app/stores';
</script>

<header>
	<div class="navbar bg-base-300" style="display: flex; justify-content: space-between;">
		<div class="mobile">
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
					<li>
						<a
							class:active={$page.url.pathname.match(/^\/about\/?[0-9a-fA-F]*$/)}
							class="text-accent"
							href="/about">About</a
						>
					</li>
				</ul>
			</div>
		</div>
		<a href="/" class="btn btn-ghost normal-case text-xl">
			<span class="text-primary">Foodie</span>
			<span class="lowercase text-base-content">blog 🍪</span>
		</a>
		<div class="desktop">
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
				<li>
					<a
						class:active={$page.url.pathname.match(/^\/about\/?[0-9a-fA-F]*$/)}
						class="text-accent"
						href="/about">About</a
					>
				</li>
			</ul>
		</div>
	</div>
</header>

<style lang="postcss">
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
</style>
