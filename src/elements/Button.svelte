<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { Accent, FontSize } from './element-types'

	const dispatch = createEventDispatcher()

	export let type: 'button' | 'submit' | 'reset' = 'button'
	export let href: string | null = null
	export let disabled: boolean = false
	export let loading: boolean = false
	export let accent: Extract<Accent, 'primary' | 'warning'> = 'primary'
	export let size: FontSize = 'text-sm'
	export let outline: 'btn-outline' | '' = ''

	$: if (href && !href.startsWith('/'))
		console.error('{href} prop must start with a slash to be a valid link')
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{href}
	disabled={disabled || loading}
	aria-busy={loading}
	class={`btn uppercase btn-${accent} ${size} ${outline}`}
	on:click={() => dispatch('click')}
	{type}
	{...$$restProps}
>
	<slot />
</svelte:element>
