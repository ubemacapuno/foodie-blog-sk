<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import Portal from 'svelte-portal/src/Portal.svelte';
	import { shortcut } from '$lib/actions/shortcut';

	export let isModalOpen: string | boolean | undefined = false;
	export let isCloseButtonShowing = true;
	export let title = '';
	export let style = '';
	export let onClose = () => {};

	function closeModal() {
		onClose();
		isModalOpen = false;
	}
</script>

{#if isModalOpen}
	<Portal target="body">
		<div transition:fly={{ opacity: 0, y: 50 }} class="modal-wrapper" {style}>
			<div class="card bg-neutral text-neutral-content">
				<div class="card-body items-center text-center">
					{#if isCloseButtonShowing || title}
						{#if title}
							<h2 class="card-title">
								{title}
							</h2>
						{/if}
						{#if isCloseButtonShowing}
							<button class="btn-close" on:click={closeModal} aria-label="Close Modal Box">×</button
							>
						{/if}
					{/if}
					<div class="p-0 card-body bg-base-200">
						<slot />
					</div>
				</div>
			</div>
		</div>
		<div
			on:click={closeModal}
			transition:fade
			class="background"
			use:shortcut={{ key: 'Escape' }}
			on:keypress={closeModal}
		/>
	</Portal>
{/if}

<style>
	.modal-wrapper {
		border-radius: 1rem;
		inset: 25px 0 auto;
		margin: 0 auto;
		max-width: 530px;
		min-width: 320px;
		position: fixed;
		width: 100%;
		z-index: 1001;
		padding: 20px;
		max-height: 90svh;
		overflow-y: auto; /* Make the Modal scrollable */
	}
	.modal-wrapper .btn-close {
		position: absolute;
		right: -0;
		top: -0;
		z-index: 1;
		background: red;
		color: white;
		border-radius: 30px;
		width: 30px;
		height: 30px;
	}
	@media screen and (max-height: 700px) {
		.modal-wrapper {
			inset: 0;
			max-height: 100vh;
		}
	}
	.background {
		background: rgba(0, 0, 0, 0.5);
		cursor: pointer;
		inset: 0;
		opacity: 0.9;
		position: fixed;
		z-index: 1000;
	}
</style>
