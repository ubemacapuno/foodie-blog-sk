<script lang="ts">
	import ConfirmDeleteModal from './ConfirmDeleteModal.svelte'
	import { signIn } from '@auth/sveltekit/client'

	// Modal Props
	export let isConfirmActive = false
	// Form props
	// Button props
	export let disabled = false

	const title = 'We Value Your Privacy'

	let isCheckboxChecked = false

	$: disabled = !isCheckboxChecked
</script>

<button
	on:click={() => {
		isConfirmActive = true
	}}
	class="btn btn-sm btn-primary link no-underline"
>
	<slot />
</button>

<ConfirmDeleteModal bind:isModalOpen={isConfirmActive} {title}>
	<div class="bg-neutral text-left">
		<p>
			To enhance your experience on our platform, we use your
			<a
				class="link text-primary"
				target="_blank"
				rel="noopener"
				href="https://docs.github.com/en/apps/oauth-apps">GitHub OAuth</a
			> information for authentication.
		</p>
		<br />
		<p>
			This helps link the dishes you create to your account, enabling edits and deletions. We assure
			you of the utmost privacy: your OAuth information will not be shared with third parties and is
			only used for account-related activities.
		</p>
		<br />
		<p>
			By agreeing, you consent to the use of your <a
				class="link text-primary"
				target="_blank"
				rel="noopener"
				href="https://docs.github.com/en/apps/oauth-apps">GitHub OAuth</a
			> information for these purposes.
		</p>
		<br />
		<div class="form-control pt-2 pb-4">
			<label class="cursor-pointer label flex flex-row justify-center gap-x-10">
				<span class="label-text text-accent">I Consent</span>
				<input
					type="checkbox"
					bind:checked={isCheckboxChecked}
					class="checkbox checkbox-secondary"
				/>
			</label>
		</div>

		<div class="flex flex-row justify-center gap-x-2">
			<button
				class="btn btn-sm btn-secondary"
				on:click|preventDefault={() => {
					isConfirmActive = false
				}}
			>
				Decline
			</button>
			<!-- 
					 preventDefault is a Svelte modifier which calls event.preventDefault() before running the handler. In this case, it will prevent the form from being submitted when you click the "Cancel" button, thus preventing the dish from being deleted.
					 @see docs https://svelte.dev/tutorial/event-modifiers
				-->
			<button
				type="submit"
				class="btn btn-sm btn-error"
				{disabled}
				on:click={() => signIn('github')}
			>
				Accept
			</button>
		</div>
	</div>
</ConfirmDeleteModal>
