<script>
	import ToastMessage from './ToastMessage.svelte';
	import '../app.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
</script>

<div class="flex flex-col min-h-screen relative">
	<Header />
	<div class="flex justify-center">
		<div class="max-w-3xl mx-1 pt-4">
			<slot />
		</div>
	</div>
	<div class="mt-10">
		<Footer />
	</div>
</div>
<!-- Off Canvas -->
<ToastMessage />
