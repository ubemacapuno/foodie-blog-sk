<script lang="ts">
	import { FEATURE_FLAG } from '$constants/searchParams'
	import { queryParam } from 'sveltekit-search-params'
	import { dev } from '$app/environment'

	/*
	 * Feature Flag
	 *
	 * @example <FeatureFlag flag="todo-list">[FEATURE CONTENT]</FeatureFlag>
	 *
	 * This component is used to hide features behind a feature flag.
	 * All features will show in dev mode (determined by '$app/environment')
	 * in production, to show something wrapped in a feature flag, add the feature flag to the url query params (comma separated).
	 * @example /projects?featureFlag=secret-project,another-secret-project
	 *
	 * To show all features, add the feature flag "all" to the url query params.
	 * @example /projects?featureFlag=all
	 *
	 * If you want to show a fallback component when the feature flag is not present, you can use the fallback slot.
	 *
	 * To use within logic that does things such as hide an item being mapped over, you can use the $featureFlag store.
	 * @example {#if $featureFlag?.includes('todo-list')}[FEATURE CONTENT]{/if}
	 *
	 * ! Note: This should not be used for anything sensitive. This is just a way to hide features that are not ready for production.
	 *
	 */

	const featureFlag = queryParam(FEATURE_FLAG)

	// 💡 Reminder: Every time you add or remove a feature flag remember to update the 'Flag' type as well so we know what flags are available.
	type Flag = 'all' | 'uploads' | 'restaurants'

	export let flag: Flag
</script>

{#if dev || $featureFlag?.includes('all') || $featureFlag?.includes(flag)}
	<slot />
{:else if $$slots.fallback}
	<slot name="fallback" />
{/if}
