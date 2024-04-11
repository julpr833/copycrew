<!-- create group -->
<script lang="ts">
	export let groupName: string = '';
	export let description: string = '';
	export let error: string | null = null;

	async function handleSubmit(event: Event): Promise<void> {
		event.preventDefault();

		try {
			const response = await fetch('/api/groups', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ groupName, description })
			});

			if (response.ok) {
				groupName = '';
				description = '';
				error = null;
				return console.log('Group created');
			}

			const data = await response.json();
			error = data.message;
		} catch (err) {
			error = 'Something went wrong';
		}
	}
</script>

<section id="create-group" class="h-[92.6vh] flex flex-col items-center">
	<form
		class="max-w-[20rem] p-12 border border-black dark:border-white rounded-lg shadow-md text-black dark:text-white flex flex-col gap-2 items-center mt-12"
		on:submit|preventDefault={handleSubmit}
	>
		<h2 class="text-2xl font-bold mb-4 text-purple-400">Create a group</h2>

		<label for="groupName" class="text-xs block self-baseline font-bold">Name of the group</label>
		<input
			id="groupName"
			type="text"
			class="border p-2 rounded w-full text-black outline-2 outline outline-transparent focus:outline-purple-500 outline-offset-2 transition-[outline, scale] hover:scale-105 duration-300"
			bind:value={groupName}
		/>

		<label for="description" class="text-xs block mt-4 self-baseline font-bold">Description</label>
		<textarea
			id="description"
			rows="3"
			class="border p-2 rounded w-full text-black outline-2 outline outline-transparent focus:outline-purple-500 outline-offset-2 transition-[outline, scale] hover:scale-105 duration-300"
			bind:value={description}
		/>

		<button
			type="submit"
			class="mt-4 bg-purple-600 hover:bg-purple-900 transition-colors duration-200 text-white rounded p-2 w-full"
			>Create</button
		>

		{#if error}
			<p class="text-red-500">{error}</p>
		{/if}
	</form>
</section>
