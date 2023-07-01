<script lang="ts">
	import type { FontSize, Accent, IconName } from '$elements/element-types';

	export let name: IconName;
	export let size: FontSize = 'text-lg';
	export let accent: Accent | undefined = undefined;
	export let disabled = false;
	export let style = '';
</script>

<span
	class={`icon icon-${name} material-symbols-outlined ${
		disabled || accent ? `${disabled || accent}_color` : ''
	} ${size}_font ${$$props.class ?? ''}`}
	{style}
>
	{name}
</span>

<style lang="postcss">
	.icon {
		flex-shrink: 0;
	}

	:global() {
		.material-symbols-outlined {
			font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48;
			line-height: inherit;
		}
	}
</style>
