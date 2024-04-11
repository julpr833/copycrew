<!-- login -->
<script lang="ts">
	export let form;
</script>

<svelte:head>
	<title>Copycrew - Login</title>
</svelte:head>

<section id="login" class="flex flex-col justify-center items-center h-[92.6vh]">
	<div
		class="login-bg flex flex-col justify-center items-center border border-black dark:border-white px-8 py-16 rounded-lg text-black dark:text-white"
	>
		<h2 class="text-purple-700 dark:text-purple-400 text-3xl font-bold mb-12">
			Login to your account
		</h2>
		<form action="?/login" method="POST" class="flex flex-col relative">
			<div class="flex flex-col mb-4 email-input">
				<label
					class="font-bold dark:font-normal text-sm my-1 tracking-widest transition-colors duration-300"
					for="email">Email</label
				>
				<input
					type="email"
					name="email"
					id="email"
					pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
					required
					class="rounded-md w-72 p-2 bg-transparent border border-black dark:border-white focus:outline-none text-sm"
				/>
			</div>
			<div class="flex flex-col mb-4 password-input">
				<label
					class="font-bold dark:font-normal text-sm my-1 tracking-widest transition-colors duration-300"
					for="password">Password</label
				>
				<input
					type="password"
					name="password"
					id="password"
					autocomplete="off"
					minlength="8"
					required
					class="rounded-md w-72 p-2 bg-transparent border border-black dark:border-white focus:outline-none text-sm"
				/>
			</div>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-1 transition-transform hover:scale-105 duration-300">
					<input
						type="checkbox"
						name="remember"
						id="remember"
						class="my-2 cursor-pointer accent-purple-700"
					/>
					<label
						for="remember"
						class="text-[#583d7c] dark:text-[#cdaff5] font-bold text-sm dark:font-normal cursor-pointer"
						>Remember me</label
					>
				</div>
				<a
					href="/forgot-password"
					class="text-[#583d7c] dark:text-[#cdaff5] hover:text-[#824192] dark:hover:text-[#a474e2] transition-colors duration-300 font-bold text-sm dark:font-normal"
					>I forgot my password</a
				>
			</div>

			<button
				class="mt-6 text-white bg-purple-700 hover:bg-indigo-500 hover:scale-110 transition-[background-color, transform] duration-300 rounded-md w-fit px-5 py-2 self-center"
				>Login</button
			>
		</form>
	</div>
	{#if form?.error}
		<p class="pt-4 text-red-500 font-bold text-center max-w-sm text-pretty break-words text-sm">
			{form.error}
		</p>
	{/if}
</section>

<style>
	@media (prefers-color-scheme: dark) {
		.login-bg {
			background: linear-gradient(to right, transparent, #201f3185, transparent);
		}

		.email-input:focus-within label,
		.password-input:focus-within label {
			color: #2b1f3b;
		}
	}

	.email-input:focus-within label,
	.password-input:focus-within label {
		color: #9e82c2;
	}
</style>
