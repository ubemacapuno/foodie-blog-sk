<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import Portal from 'svelte-portal/src/Portal.svelte';
	export let isModalOpen = false;
	function closeModal() {
		isModalOpen = false;
	}
	// TODO: clean up classes below after css vars are made and then completely remove Daisy UI from this
</script>

{#if isModalOpen}
	<Portal target="body">
		<div transition:fly={{ opacity: 0, y: 50 }} class="modal-wrapper">
			<button class="btn-close" on:click={closeModal} aria-label="Close Modal Box">×</button>
			<div class="card-body bg-base-200">
				<slot />
			</div>
		</div>
		<div on:click={closeModal} transition:fade class="background" />
	</Portal>
{/if}

<style>
	.modal-wrapper {
		inset: 100px 0 auto;
		margin: 0 auto;
		max-width: 530px;
		min-width: 320px;
		position: fixed;
		width: 100%;
		z-index: 1001;
		padding: 20px;
		height: auto;
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
