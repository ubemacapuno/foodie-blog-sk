<script lang="ts">
	import InputWrapper from './InputWrapper.svelte'
	import type { FieldPath, UnwrapEffects } from 'sveltekit-superforms'
	import type { SuperForm } from 'sveltekit-superforms/client'
	import { formFieldProxy } from 'sveltekit-superforms/client'
	import type { z, AnyZodObject } from 'zod'

	type T = $$Generic<AnyZodObject>

	export let form: SuperForm<UnwrapEffects<T>, unknown>
	export let field: keyof z.infer<T> | FieldPath<z.infer<T>>

	export let type: 'text' | 'password' | 'number' | 'textarea' = 'text'
	export let label: string | undefined = undefined
	export let span = 1
	export let style = ''
	export let rows = 5

	function setType(el: HTMLInputElement) {
		el.type = type
	}

	const { path, value, errors, constraints } = formFieldProxy(form, field)

	const { tainted } = form

	$: isTainted = () => {
		let obj = $tainted
		for (let key of path) {
			if (!Object.keys(obj || {}).includes(String(key))) {
				return false
			}
			obj = obj[key]
		}
		return true
	}
</script>

<InputWrapper
	label={label ?? String(path)}
	error={isTainted() ? $errors : undefined}
	required={$constraints?.required}
	{span}
	{style}
>
	{#if type === 'textarea'}
		<textarea
			class="textarea textarea-bordered h-24"
			name={String(field)}
			bind:value={$value}
			data-invalid={$errors}
			{rows}
			{...$constraints}
			{...$$restProps}
		/>
	{:else}
		<input
			name={String(field)}
			use:setType
			bind:value={$value}
			data-invalid={isTainted() ? $errors : undefined}
			class="input input-bordered w-full max-w-xs"
			{...$constraints}
			{...$$restProps}
		/>
	{/if}
</InputWrapper>
