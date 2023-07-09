<script lang="ts">
	import { page } from '$app/stores'
	import EmptyState from '$elements/EmptyState.svelte'
</script>

<EmptyState accent="text-warning" content={`${$page.status.toString()} ${$page.error?.message}`}>
	<a class="btn btn-sm btn-primary" href="/">Go Home</a>
</EmptyState>
