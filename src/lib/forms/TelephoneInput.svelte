<script lang="ts">
	import DropdownMenu from '$lib/components/DropdownMenu.svelte'
	import MenuItem from '$lib/components/MenuItem.svelte'
	import { TelInput, normalizedCountries, isSelected } from 'svelte-tel-input'
	import type { UnwrapEffects } from 'sveltekit-superforms'
	import type { SuperForm } from 'sveltekit-superforms/client'
	import { formFieldProxy } from 'sveltekit-superforms/client'
	import type { z, AnyZodObject } from 'zod'

	type T = $$Generic<AnyZodObject>

	export let form: SuperForm<UnwrapEffects<T>, unknown>
	export let phoneField: keyof z.infer<T>
	export let countryCodeField: keyof z.infer<T>

	const { path, value, errors, constraints } = formFieldProxy(form, phoneField)
	const { tainted } = form

	const {
		value: ccValue,
		errors: ccErrors,
		constraints: ccConstraints
	} = formFieldProxy(form, countryCodeField)

	let searchText = ''

	$: selectedCountryDialCode =
		normalizedCountries.find((el) => el.iso2 === $ccValue)?.dialCode || null

	// Define top countries
	const topCountries = ['US', 'MX', 'CA', 'CN', 'TW']

	// Split the countries array into top countries and the rest
	const topCountriesData = normalizedCountries
		.filter((country) => topCountries.includes(country.iso2))
		.sort((a, b) => topCountries.indexOf(a.iso2) - topCountries.indexOf(b.iso2))

	const otherCountries = normalizedCountries.filter(
		(country) => !topCountries.includes(country.iso2)
	)

	// Concatenate/spread arrays so top countries come first
	const countries = [...topCountriesData, ...otherCountries]

	const handleSelect = (val) => {
		if (
			$ccValue === undefined ||
			$ccValue === null ||
			(typeof $ccValue === typeof val && $ccValue !== val)
		) {
			$ccValue = val
		}
	}

	$: isTainted = () => {
		if (!$tainted) return false

		const dotPath = path.replace(/\[(\d+)\]/g, '.$1')
		// check if the path is in the tainted object
		return dotPath.split('.').reduce((acc, key) => {
			if (acc && acc[key]) return acc[key]
			return false
		}, $tainted)
	}
	$: console.log('TelephoneInput value:', $value)
</script>

<div class="flex flex-row">
	<DropdownMenu left="0" minWidth="16rem">
		<button slot="dropdown-button" class="input_button">
			{#if $ccValue && $ccValue !== null}
				{$ccValue} (+{selectedCountryDialCode})
			{:else}
				Please select
			{/if}

			<!-- <Icon name="arrow_drop_down" /> -->
		</button>

		<div slot="dropdown-body">
			<div class="search">
				<input
					type="text"
					class="full_width"
					bind:value={searchText}
					placeholder="Search..."
					on:click={(e) => e.stopPropagation()}
				/>
			</div>
			{#each countries.filter((country) => {
				if (searchText === '') return true
				return country.name.toLowerCase().includes(searchText.toLowerCase())
			}) as country (country.id)}
				{@const active = isSelected(country.iso2, $ccValue)}
				<MenuItem {active} type="button" on:click={() => handleSelect(country.iso2)}>
					{country.name} <span class="subtext_color">(+{country.dialCode})</span>
				</MenuItem>
			{/each}
		</div>
	</DropdownMenu>

	<TelInput
		id="tel-input"
		placeholder="(201) 555-0123"
		bind:country={$ccValue}
		bind:value={$value}
		options={{ invalidateOnCountryChange: false }}
		required={$constraints?.required}
	/>
</div>

<style>
	.search {
		position: sticky;
		top: calc(var(--gap_smallest) * -1);
		left: 0;
		width: 100%;
		background: var(--modal_color);
		padding: var(--gap_xsmall);
	}

	.input_button {
		border: 1px solid var(--input_border_color);
		border-radius: var(--input_radius);
		padding: var(--gap_smallest) var(--gap_small);
		background-color: var(--bg_color);
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		min-width: 8rem;
	}
</style>
