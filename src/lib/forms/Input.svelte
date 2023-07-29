<script lang="ts">
	// TODO make an input wrapper component ?
	import type { FieldPath, UnwrapEffects } from 'sveltekit-superforms'
	import type { SuperForm } from 'sveltekit-superforms/client'
	import { formFieldProxy } from 'sveltekit-superforms/client'
	import type { z, AnyZodObject } from 'zod'

	type T = $$Generic<AnyZodObject>

	export let form: SuperForm<UnwrapEffects<T>, unknown>
	export let field: keyof z.infer<T> | FieldPath<z.infer<T>> | string

	export let type: 'text' | 'password' | 'number' | 'textarea' = 'text'
	export let rows = 5

	function setType(el: HTMLInputElement) {
		el.type = type
	}

	const { path, value, errors, constraints } = formFieldProxy(form, field)

	const { tainted } = form

	$: isTainted = () => {
		if (!$tainted) return false

		const dotPath = path.replace(/\[(\d+)\]/g, '.$1')
		// check if the path is in the tainted object
		return dotPath.split('.').reduce((acc, key) => {
			if (acc && acc[key]) return acc[key]
			return false
		}, $tainted)
	}
</script>

{#if type === 'textarea'}
	<textarea
		name={String(field)}
		bind:value={$value}
		on:change
		data-invalid={$errors}
		{rows}
		{...$constraints}
		{...$$restProps}
	/>
{:else}
	<input
		name={String(field)}
		use:setType
		on:change
		bind:value={$value}
		data-invalid={isTainted() ? $errors : undefined}
		{...$constraints}
		{...$$restProps}
	/>
{/if}
