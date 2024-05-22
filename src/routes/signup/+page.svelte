<!-- signup -->

<script lang="ts">
	export let form;
</script>

<svelte:head>
	<title>Copycrew - Sign up</title>
</svelte:head>

<section id="login" class="flex flex-col justify-center items-center h-[92.6vh]">
	<div
		class="login-bg flex flex-col justify-center items-center border border-black dark:border-white px-8 py-12 rounded-lg text-black dark:text-white"
	>
		<h2 class="text-purple-700 dark:text-purple-400 text-3xl font-bold mb-12">
			Create your account
		</h2>
		<form action="?/register" method="POST" class="flex flex-col relative">
			<div class="flex flex-col mb-4 labeled-input">
				<label
					class="font-bold dark:font-normal text-sm my-1 tracking-widest transition-colors duration-300"
					for="username">Username</label
				>
				<input
					type="text"
					name="username"
					id="username"
					required
					class="rounded-md w-72 p-2 bg-transparent border border-black dark:border-white focus:outline-none text-sm"
				/>
			</div>
			<div class="flex flex-col mb-4 labeled-input">
				<label
					class="font-bold dark:font-normal text-sm my-1 tracking-widest transition-colors duration-300"
					for="email">Email</label
				>
				<input
					type="email"
					name="email"
					id="email"
					required
					class="rounded-md w-72 p-2 bg-transparent border border-black dark:border-white focus:outline-none text-sm"
				/>
			</div>
			<div class="flex flex-col mb-4 labeled-input">
				<label
					class="font-bold dark:font-normal text-sm my-1 tracking-widest transition-colors duration-300"
					for="email-confirmation">Confirm your Email</label
				>
				<input
					type="email"
					name="email-confirmation"
					id="email-confirmation"
					pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
					autocomplete="off"
					required
					class="rounded-md w-72 p-2 bg-transparent border border-black dark:border-white focus:outline-none text-sm"
				/>
			</div>
			<div class="flex flex-col mb-4 labeled-input">
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
			<div class="flex flex-col mb-4 labeled-input">
				<label
					class="font-bold dark:font-normal text-sm my-1 tracking-widest transition-colors duration-300"
					for="password-confirmation">Confirm your Password</label
				>
				<input
					type="password"
					name="password-confirmation"
					id="password-confirmation"
					autocomplete="off"
					minlength="8"
					required
					class="rounded-md w-72 p-2 bg-transparent border border-black dark:border-white focus:outline-none text-sm"
				/>
			</div>

			<button
				class="mt-4 text-white bg-purple-700 hover:bg-indigo-500 hover:scale-110 transition-[background-color, transform] duration-300 rounded-md w-fit px-5 py-2 self-center"
				>Sign up</button
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

		.labeled-input:focus-within label {
			color: #2b1f3b;
		}
	}

	.labeled-input:focus-within label {
		color: #9e82c2;
	}
</style>
