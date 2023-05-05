<script>
	import { sendToast } from '$lib/stores/toast';
</script>

<div class="card max-w-screen-lg bg-base-200">
	<div class="card-body">
		<div class="flex flex-col">
			<h2 class="card-title">Toast Buttons</h2>
			<p>Press the buttons below for example toast messages.</p>
			<div class="btn-group mt-6">
				<button
					class="w-28 btn btn-info"
					on:click={() => sendToast('Info toast message test', 'info')}>Info</button
				>
				<button
					class="w-28 btn btn-accent"
					on:click={() => sendToast('Success toast message test', 'success')}>Success</button
				>
				<button
					class="w-28 btn btn-warning"
					on:click={() => sendToast('Warning toast message test', 'warning')}>Warning</button
				>
				<button
					class="w-28 btn btn-error"
					on:click={() => sendToast('Error toast message test', 'error')}>Error</button
				>
			</div>
		</div>
	</div>
</div>
