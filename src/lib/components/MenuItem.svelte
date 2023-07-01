<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { IconName } from '$elements/element-types';
	import Icon from '$elements/Icon.svelte';

	const dispatch = createEventDispatcher();

	export let active = false;
	export let iconName: IconName | undefined = undefined;
	export let href: string | null = null;
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<svelte:element
	this={href ? 'a' : 'button'}
	on:click={() => dispatch('click')}
	class="menu_item"
	class:active
	{href}
	{...$$restProps}
>
	<span class="menu_label">
		{#if iconName}<Icon name={iconName} size="text-lg" />{/if}
		<slot />
	</span>
</svelte:element>

<style lang="postcss">
	.menu_item {
		display: inline-flex;
		align-items: center;
		width: 100%;
		padding: var(--gap_smallest);
		border-radius: var(--border_radius);
		color: var(--text_color);
		transition: var(--transition_speed) background-color;
		cursor: pointer;

		& + :global(.menu_item) {
			margin-top: var(--gap_smallest);
		}

		:global(.icon) {
			color: var(--subtext_color);
		}

		&:hover,
		&.active {
			color: var(--title_color);
			background-color: var(--hover_color);

			:global(.icon) {
				color: var(--title_color);
			}
		}

		.menu_label {
			font-size: var(--font_small);
			display: inline-flex;
			gap: var(--gap_small);
			align-items: center;
			text-align: left;
		}
	}
</style>
