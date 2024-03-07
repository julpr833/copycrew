<script>
	import Navbar from '../components/Navbar.svelte';
	import '../app.css';
</script>

<Navbar />
<main class="main-background">
	<slot />
</main>

<style>
	/* Dark scheme background */

	@media (prefers-color-scheme: dark) {
		.main-background {
			background: linear-gradient(315deg, #252435 0%, #243146 100%);
			background-size: 400% 400%;
			animation: 17s ease infinite backgroundAnimation;
		}
	}
</style>
