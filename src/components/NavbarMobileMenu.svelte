<script lang="ts">
	import { slide } from 'svelte/transition';

	let showSidebar = false;

	function spin(node: Node, { duration = 500 }: { duration?: number }) {
		return {
			duration,
			css: (t: number) => {
				return `
                transform: rotate(${t * 180}deg);
                color: hsl(
                    ${Math.trunc(t * 360)},
                    ${Math.min(100, 1000 * (1 - t))}%,
                    ${Math.min(50, 500 * (1 - t))}%
                );`;
			}
		};
	}
</script>

<div id="mobile-menu" class="md:hidden h-5 w-5">
	<button
		aria-label="mobile-menu-button"
		id="mobile-menu--button"
		on:click={() => (showSidebar = !showSidebar)}
		class="hover:opacity-80 transition-opacity duration-300 absolute h-4 z-20 right-1"
	>
		{#key showSidebar}
			<svg
				width="32"
				height="32"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				class="stroke-black dark:stroke-white"
				class:stroke-white={showSidebar}
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				in:spin={{ duration: 150 }}
			>
				{#if showSidebar === false}
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M4 6l16 0" />
					<path d="M4 12l16 0" />
					<path d="M4 18l16 0" />
				{:else}
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M18 6l-12 12" />
					<path d="M6 6l12 12" />
				{/if}
			</svg>
		{/key}
	</button>
	{#if showSidebar === true}
		<aside
			transition:slide={{ duration: 100, axis: 'x' }}
			class="bg-slate-700 text-white dark:bg-slate-900 absolute top-0 right-0 h-full"
		>
			<ul class="mt-16 mx-6 flex flex-col items-start font-bold text-nowrap">
				<li class="py-2"><a on:click={() => (showSidebar = false)} href="/login">Login</a></li>
				<li class="py-2"><a on:click={() => (showSidebar = false)} href="/signup">Sign Up</a></li>
				<li class="flex gap-2 py-2">
					<a on:click={() => (showSidebar = false)} href="/copypastes">My copypastes</a><svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="#ffffff"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path
							d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"
						/>
						<path
							d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"
						/>
					</svg>
				</li>
				<li class="flex gap-2 py-2">
					<a on:click={() => (showSidebar = false)} href="/groups">Groups</a>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="#ffffff"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
						<path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
						<path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
						<path d="M17 10h2a2 2 0 0 1 2 2v1" />
						<path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
						<path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
					</svg>
				</li>
			</ul>
		</aside>
	{/if}
</div>

<style>
	#mobile-menu li:not(:last-child) {
		border-bottom: 1px solid #6f32be;
	}
</style>