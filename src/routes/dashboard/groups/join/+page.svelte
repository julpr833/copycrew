<script lang="ts">
	export let inviteCode: string = '';

	async function handleSubmit(event: Event): Promise<void> {
		event.preventDefault();

		// handle form submission logic
	}
</script>

<!-- join group -->
<section id="join-group" class="h-[92.6vh] flex flex-col items-center">
	<form
		class="max-w-[20rem] p-12 border border-black dark:border-white rounded-lg shadow-md text-black dark:text-white flex flex-col gap-2 items-center mt-12"
		on:submit|preventDefault={handleSubmit}
	>
		<h2 class="text-2xl font-bold mb-4 text-purple-400">Enter invite code</h2>

		<input
			id="inviteCode"
			type="text"
			class="p-2 rounded w-full text-black outline-2 outline outline-transparent focus:outline-purple-500 outline-offset-2 transition-[outline, scale] hover:scale-105 duration-300"
			maxlength="8"
			pattern="^[a-zA-Z0-9]{8}$"
			bind:value={inviteCode}
		/>

		<button
			type="submit"
			class="mt-4 bg-purple-600 hover:bg-purple-700 text-white rounded p-2 w-full">Join</button
		>
	</form>
</section>
