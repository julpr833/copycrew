<script lang="ts">
	import NavbarLogo from './NavbarLogo.svelte';
	import NavbarDropdown from './NavbarDropdown.svelte';
	import NavbarMobileMenu from './NavbarMobileMenu.svelte';
</script>

<nav
	class="dark:text-white dark:bg-gradient-to-r from-[#252435] to-[#131f31] p-3 flex justify-center"
>
	<div class="flex flex-row items-center justify-between lg:min-w-[60%] md:min-w-full">
		<NavbarLogo />
		<!-- TODO: conditional render -->
		<div class="hidden md:flex flex-row gap-16">
			<ul class="flex flex-row gap-3"></ul>
			<NavbarDropdown />

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
		</div>
		<NavbarMobileMenu />
	</div>
</nav>
