<script lang="ts">
	import { fade } from 'svelte/transition';

	let showDropdown = false;
	let dropdownTimeout: ReturnType<typeof setTimeout>;

	function handleDropdownMouseEnter() {
		clearTimeout(dropdownTimeout);
		showDropdown = true;
	}

	function handleDropdownMouseLeave() {
		dropdownTimeout = setTimeout(() => {
			showDropdown = false;
		}, 200);
	}
</script>

<nav
	class="dashboard-button flex flex-row items-center gap-1 relative cursor-pointer"
	on:mouseenter={handleDropdownMouseEnter}
	on:mouseleave={handleDropdownMouseLeave}
>
	<a
		aria-label="home"
		href="/dashboard"
		class="text-[#b078fa] hover:text-[#583d7c] dark:hover:text-[#cdaff5] transition-colors duration-300 font-bold"
		>Dashboard
		{#if showDropdown}
			<ul
				role="menu"
				tabindex="0"
				aria-label="dashboard-dropdown"
				in:fade={{ duration: 200 }}
				on:mouseenter={handleDropdownMouseEnter}
				on:mouseleave={handleDropdownMouseLeave}
				class="dashboard-dropdown cursor-pointer absolute font-bold bg-[#e9e9e9] text-[#4b4b4b] dark:text-white dark:bg-slate-900 top-7 w-full rounded-md p-2 min-w-44"
			>
				<li class="flex items-center gap-2">
					<a href="/copypastes">My copypastes</a><svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						class="stroke-black dark:stroke-white"
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
				<li class="flex items-center gap-2">
					<a href="/groups">Groups</a>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						class="stroke-black dark:stroke-white"
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
		{/if}</a
	>
	<svg
		class="dashboard-button--arrow"
		width="18"
		height="18"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="#6f32be"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path
			d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z"
			stroke-width="0"
			fill="currentColor"
		/>
	</svg>
</nav>

<style>
	.dashboard-dropdown li {
		cursor: pointer;
		padding-block: 8px;
		padding-inline: 4px;
	}

	.dashboard-dropdown li:not(:last-child) {
		border-bottom: 1px solid #6f32be;
	}

	.dashboard-button:hover .dashboard-button--arrow {
		animation: 1s cubic-bezier(0.74, -0.05, 0.4, 0.86) infinite bounce;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translate3d(0, 0, 0);
		}
		50% {
			transform: translate3d(0, 4px, 0);
		}
	}
</style>
