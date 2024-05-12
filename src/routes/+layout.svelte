<script lang="ts">
	import NavbarLogo from '../components/NavbarLogo.svelte';
	import NavbarDropdown from '../components/NavbarDropdown.svelte';
	import NavbarMobileMenu from '../components/NavbarMobileMenu.svelte';
	import '../app.css';
	import { FlatToast, ToastContainer } from 'svelte-toasts';

	export let data;
</script>

<nav
	class="dark:text-white dark:bg-gradient-to-r from-[#252435] to-[#131f31] p-3 flex justify-center"
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
