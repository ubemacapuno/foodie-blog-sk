<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
</script>

Please sign in!
<div>
	<button
		class="btn btn-sm btn-outline btn-primary link no-underline"
		on:click={() => signIn('github')}
	>
		Login
	</button>
</div>
