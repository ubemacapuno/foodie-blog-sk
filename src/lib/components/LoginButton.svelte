<script lang="ts">
	import ConfirmDeleteModal from './ConfirmDeleteModal.svelte';
	import { signIn } from '@auth/sveltekit/client';

	// Modal Props
	export let isConfirmActive = false;
	// Form props
	// Button props
	export let disabled = false;
	let title = 'We Value Your Privacy';
	let description =
		'In order to enhance your experience and to enable certain features, we need to record your email address when you create dishes on our platform.';
	let isCheckboxChecked = false;

	$: disabled = !isCheckboxChecked;
</script>

<button
	on:click={() => {
		isConfirmActive = true;
	}}
	class="btn btn-sm btn-primary link no-underline"
>
	<slot />
</button>

<ConfirmDeleteModal bind:isModalOpen={isConfirmActive} {title}>
	<div class="bg-neutral">
		<p>{@html description}</p>
		<p>We assure you that your email address will be used solely for the purpose of:</p>
		<ul>
			<li>
				Linking the dishes you create to your account so you can edit or delete them in the future.
			</li>
			<li>
				Informing you about any updates or changes related to the dishes you've created, if
				necessary.
			</li>
		</ul>
		<p>
			We respect your privacy and we're committed to protecting it. Your email address will not be
			shared with any third parties without your explicit consent and you can always choose to
			remove your email from our system.
		</p>
		<p>
			By checking the "I Agree" checkbox, you are providing us with your consent to use your email
			address for the above purposes. If you don't agree, you may not be able to create dishes on
			our platform.
		</p>
		<div class="form-control">
			<label class="cursor-pointer label">
				<span class="label-text">I Agree</span>
				<input
					type="checkbox"
					bind:checked={isCheckboxChecked}
					class="checkbox checkbox-secondary"
				/>
			</label>
		</div>

		<button
			class="btn btn-sm btn-outline btn-secondary"
			on:click|preventDefault={() => {
				isConfirmActive = false;
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
			class="btn btn-sm btn-outline btn-error"
			{disabled}
			on:click={() => signIn('github')}
		>
			Accept
		</button>
	</div>
</ConfirmDeleteModal>
