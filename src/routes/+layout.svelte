<script>
	import { page } from '$app/stores'
	import ToastMessage from './ToastMessage.svelte'
	import '../app.css'
	import TopNav from './TopNav.svelte'
	import Footer from './Footer.svelte'
	import { navigating } from '$app/stores'
	import { loading } from '$lib/stores/loading'
	import Alert from '$lib/components/Alert.svelte'

	let isLoading = true

	//call method from the loading store:
	$: loading.setNavigate(!!$navigating)
	$: if ($loading.status === 'NAVIGATING') {
		setTimeout(() => {
			//If loading.status is 'NAVIGATING' after the setTimeout, then set loading.status to 'LOADING':
			if ($loading.status === 'NAVIGATING') {
				$loading.status = 'LOADING'
			}
		}, 5000)
	}
</script>

<div class="flex flex-col min-h-screen relative">
	<TopNav />
	<div class="flex justify-center">
		<div class="max-w-3xl mx-1 pt-4">
			{#if $loading.status === 'LOADING'}
				<EmptyState {isLoading} />
			{/if}
			<slot />
		</div>
	</div>
	<div class="mt-10">
		<Footer />
	</div>
</div>
<!-- Off Canvas -->
<ToastMessage />
