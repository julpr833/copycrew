<script lang="ts">
	import { fade } from 'svelte/transition';

	type Dropdown = {
		shown: boolean;
		dropdownArrow: HTMLSpanElement | null;
		hideTimeout: NodeJS.Timeout | null;

		show: () => void;
		hide: () => void;
	};

	let dropdown: Dropdown = {
		shown: false,
		dropdownArrow: null,
		hideTimeout: null,

		show: () => (
			(dropdown.shown = true), dropdown.hideTimeout && clearTimeout(dropdown.hideTimeout)
		),
		hide: () =>
			(dropdown.hideTimeout = setTimeout(() => {
				dropdown.shown = false;
			}, 200))
	};
</script>

<nav
	on:mouseover={dropdown.show}
	on:focus={dropdown.show}
	on:mouseout={dropdown.hide}
	on:blur={dropdown.hide}
	class="relative"
>
	<button>
		<a href="/dashboard" class="flex font-bold gap-1 text-purple-500 dark:text-purple-300">
			Manage
			<span bind:this={dropdown.dropdownArrow}>
				<svg
					class:point-down={dropdown.shown}
					stroke="#fff"
					width="20"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="2"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M6 9l6 6l6 -6" />
				</svg>
			</span>
		</a>
	</button>

	{#if dropdown.shown}
		<div
			class="absolute z-50 top-8 -left-8 bg-slate-300 dark:bg-slate-900/80 min-w-[120px] p-2 rounded-md"
			transition:fade={{ duration: 180 }}
		>
			<nav>
				<ul>
					<li class="mb-2">
						<a
							href="/dashboard/copypastes"
							class="hover:opacity-80 text-purple-900 dark:text-white transition-opacity duration-300 hover:text-[#583d7c] dark:hover:text-[#cdaff5] font-semibold flex gap-2"
						>
							<svg
								class="w-6 h-6 stroke-purple-900 fill-transparent dark:fill-purple-400"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-12a2 2 0 00-2-2h-2m-4-4v8m-4-24H6m10 4h8M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								/>
							</svg>
							Copypastes
						</a>
					</li>
					<li class="mb-2">
						<a
							href="/dashboard/groups"
							class="hover:opacity-80 text-purple-900 dark:text-white transition-opacity duration-300 hover:text-[#583d7c] dark:hover:text-[#cdaff5] font-semibold flex gap-2"
						>
							<svg
								class="w-6 h-6 stroke-purple-900 fill-transparent dark:fill-purple-400"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
							Groups
						</a>
					</li>
					<li>
						<a
							href="/logout"
							data-sveltekit-reload
							class="hover:opacity-80 text-purple-900 dark:text-white transition-opacity duration-300 hover:text-[#583d7c] dark:hover:text-[#cdaff5] font-semibold flex gap-2"
						>
							<svg
								class="w-6 h-6 stroke-purple-900 fill-transparent dark:fill-purple-400"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								/>
							</svg>
							Log out
						</a>
					</li>
				</ul>
			</nav>
		</div>
	{/if}
</nav>

<style>
	:global(.point-down) {
		animation: point-down 1s infinite;
	}

	@keyframes point-down {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(4px);
		}
	}
</style>
