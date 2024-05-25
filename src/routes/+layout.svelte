<script lang="ts">
	import '../app.css';
	import NavbarLogo from '../components/NavbarLogo.svelte';
	import NavbarDropdown from '../components/NavbarDropdown.svelte';
	import NavbarMobileMenu from '../components/NavbarMobileMenu.svelte';
	import { FlatToast, ToastContainer } from 'svelte-toasts';
	export let data;
</script>

<nav
	class="bg-slate-200 dark:text-white dark:bg-gradient-to-r from-[#252435] to-[#131f31] p-3 flex justify-center min-w-full"
>
	<div class="flex flex-row items-center justify-between xl:min-w-[60%] md:min-w-full">
		<NavbarLogo />

		<div class="hidden md:flex flex-row gap-16">
			<ul class="flex flex-row gap-3"></ul>

			{#if data.user}
				<NavbarDropdown />
			{/if}

			{#if !data.user}
				<ul class="flex flex-row gap-4">
					<li>
						<a
							href="/login"
							class="hover:opacity-80 transition-opacity duration-300 hover:text-[#583d7c] dark:hover:text-[#cdaff5]"
							>Login</a
						>
					</li>
					<li>
						<a
							href="/signup"
							class=" border border-black dark:border-white rounded-md py-2 px-4 hover:bg-black dark:hover:bg-white transition-colors duration-300 hover:text-white dark:hover:text-black"
							>Sign up</a
						>
					</li>
				</ul>
			{/if}
		</div>
		<NavbarMobileMenu user={data.user} />
	</div>
</nav>

<main>
	<slot />
</main>

<ToastContainer placement="bottom-right" let:data>
	<FlatToast {data} />
</ToastContainer>

<style>
	:global(.shake-error) {
		animation: shake 0.82s infinite cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
		transform: translate3d(0, 0, 0);
		transition-duration: 100ms;
		background-color: #bd3636 !important;
	}

	@keyframes shake {
		10%,
		90% {
			transform: translate3d(-1px, 0, 0);
		}

		20%,
		80% {
			transform: translate3d(2px, 0, 0);
		}

		30%,
		50%,
		70% {
			transform: translate3d(-4px, 0, 0);
		}

		40%,
		60% {
			transform: translate3d(4px, 0, 0);
		}
	}
</style>
