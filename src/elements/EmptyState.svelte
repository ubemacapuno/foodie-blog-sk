<script lang="ts">
	export let content = 'No data here.'
	export let accent: string = 'text-info'
	export let isLoading = false
</script>

{#if isLoading}
	<span class="loading loading-dots loading-lg text-primary" />
{:else}
	<div class="flex flex-col items-center justify-center gap-2 {accent}">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			class="stroke-current flex-shrink-0 w-6 h-6"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
		<p>{content}</p>
		<slot />
	</div>
{/if}
