<script>
	import '../app.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
</script>

<div class="flex flex-col min-h-screen relative">
	<Header />
	<slot />
	<div class="mt-10">
		<Footer />
	</div>
</div>
