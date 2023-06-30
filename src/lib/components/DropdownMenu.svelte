<script lang="ts">
	import { clickOutside } from '$lib/actions/click-outside';
	import { fade } from 'svelte/transition';
	export let isOpen: boolean = false;
	export let top = '30px';
	export let right = '0px';
	export let left: string | undefined = undefined;
	export let minWidth = 'none';
	export let closeOnClick = true; // ? determine if the dropdown should close when an item is clicked
	export let onClickOutside = () => {};
	export let style = '';

	const toggleDropdown = () => {
		isOpen = !isOpen;
	};

	function handleClickOutside() {
		if (isOpen) {
			onClickOutside();
		}
		isOpen = false;
	}
</script>

<div
	data-testid="dropdown-menu"
	use:clickOutside
	on:click-outside={handleClickOutside}
	class={`dropdown_menu ${$$props.class ?? ''}`}
	{style}
>
	<button
		class="dropdown_button"
		type="button"
		on:click={toggleDropdown}
		data-testid={$$props['data-testid'] || 'dropdown-button'}
	>
		<slot name="dropdown-button" />
	</button>
	{#if isOpen}
		<div
			class="dropdown_body_wrapper"
			style:min-width={minWidth}
			transition:fade={{ duration: 200 }}
			on:click={() => {
				if (closeOnClick) {
					isOpen = false;
				}
			}}
			style:top
			style:right={left ? undefined : right}
			style:left
			on:keyup={(e) => {
				if (e.key === 'Escape' && closeOnClick) {
					isOpen = false;
				}
			}}
		>
			<div>
				<slot name="dropdown-body" />
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.dropdown_menu {
		position: relative;
	}

	.dropdown_button {
		cursor: pointer;
	}

	.dropdown_body_wrapper {
		position: absolute;
		background: var(--modal_color);
		z-index: var(--header_level);
		max-height: 28rem;
		overflow-y: auto;
		border-radius: var(--border_radius);
		padding: var(--gap_xsmall);
		box-shadow: var(--button_border_color) 0 0 1px;
	}
</style>
