<script lang="ts">
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
			background: radial-gradient(
				circle at center,
				#242435 0%,
				#212145 50%,
				#1d2233 60%,
				#171731 100%
			);
			background-size: 400% 400%;
			animation: 17s ease infinite backgroundAnimation;
		}
	}

	@keyframes backgroundAnimation {
		0% {
			background-position: 0% 50%;
		}

		50% {
			background-position: 100% 50%;
		}

		100% {
			background-position: 0% 50%;
		}
	}
</style>
