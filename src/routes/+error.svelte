<script>
	import { page } from '$app/stores';
</script>

<div class="flex flex-col mt-32 justify-center items-center">
	<div class="flex flex-col items-center bg-slate-900/70 p-8 rounded-lg">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="w-48 mb-4 text-red-500 glow"
		>
			<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
			></polygon>
			<line x1="12" y1="8" x2="12" y2="12"></line>
			<line x1="12" y1="16" x2="12.01" y2="16"></line>
		</svg>
		<h1 class="text-4xl font-bold text-red-400">404</h1>
		<h2 class="mt-4 text-3xl font-bold text-red-200">Not found</h2>
		<div class="mt-8">
			<a
				href="/"
				class="border border-red-200 rounded-lg px-4 py-2 text-red-200 hover:bg-red-500 hover:text-white transition-[background-color, color] duration-300"
				>Return to home</a
			>
		</div>
	</div>
</div>

<style>
	.glow {
		animation: glow 2s infinite alternate;
	}

	@keyframes glow {
		0% {
			filter: drop-shadow(0px 0px 0px red);
		}
		100% {
			filter: drop-shadow(0px 0px 10px red);
		}
	}
</style>
