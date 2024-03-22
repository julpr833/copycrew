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

<section id="create-group" class="h-[92.6vh] flex flex-col justify-center items-center">
	<form
		class="max-w-[20rem] p-8 bg-slate-100 dark:bg-slate-900 rounded-lg shadow-md text-black dark:text-white flex flex-col gap-2 items-center"
		on:submit|preventDefault={handleSubmit}
	>
		<h2 class="text-2xl font-bold mb-4">Create a group</h2>

		<label for="groupName" class="block mb-2">Name of the group</label>
		<input
			id="groupName"
			type="text"
			class="border p-2 rounded w-full text-black"
			bind:value={groupName}
		/>

		<label for="description" class="block mb-2 mt-4">Description</label>
		<textarea
			id="description"
			rows="3"
			class="border p-2 rounded w-full text-black"
			bind:value={description}
		/>

		<button
			type="submit"
			class="mt-4 bg-purple-600 hover:bg-purple-700 text-white rounded p-2 w-full">Create</button
		>

		{#if error}
			<p class="text-red-500">{error}</p>
		{/if}
	</form>
</section>
