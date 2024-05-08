<script lang="ts">
	import { toasts } from 'svelte-toasts';
	import { blur } from 'svelte/transition';
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';

	$: console.log($page.form);

	type CopypasteForm = {
		showModal: boolean;
		toggleModal: () => void;

		title: string;
		content: string;

		categories: string[];
	};

	let addCopypaste: CopypasteForm = {
		showModal: true,
		toggleModal: () => (addCopypaste.showModal = !addCopypaste.showModal),

		title: '',
		content: '',

		categories: []
	};
</script>

<div class="w-full flex justify-center mt-8 mb-2 relative">
	<button
		on:click={addCopypaste.toggleModal}
		class={`${!addCopypaste.showModal ? 'bg-purple-600 hover:bg-purple-400' : 'bg-red-500 hover:bg-red-400 rotate-45'} rounded-full p-2 transition-[colors, transform] duration-200`}
	>
		<svg
			class="stroke-white"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="2"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M12 5l0 14" />
			<path d="M5 12l14 0" />
		</svg>
	</button>

	{#if addCopypaste.showModal}
		<div class="absolute top-12 backdrop-blur-md" transition:blur={{ duration: 200 }}>
			<form
				action="?/add"
				class="flex flex-col bg-slate-950/60 text-white p-6 rounded-md"
				method="POST"
				use:enhance={({ cancel }) => {
					if (!addCopypaste.title || !addCopypaste.content) {
						toasts.error(`${!addCopypaste.title ? 'Title' : 'Content'} is required`);
						cancel();
						return;
					}

					if (addCopypaste.title.length < 4) {
						toasts.error('Title must be at least 4 characters long');
						cancel();
						return;
					}

					return async ({ result }) => {
						await applyAction(result);
					};
				}}
			>
				<div class="flex flex-col my-2">
					<label for="title" class="text-xs mb-1 ml-1 font-semibold w-fit">Title</label>
					<input
						type="text"
						name="title"
						id="title"
						placeholder="Enter the title..."
						bind:value={addCopypaste.title}
						class="rounded-md py-1.5 px-2 bg-transparent border border-slate-600 focus:border-purple-400 transition-[border-color] duration-300 outline-none"
					/>
				</div>
				<div class="flex flex-col my-2">
					<label for="content" class="text-xs mb-1 ml-1 font-semibold w-fit">Content</label>
					<textarea
						name="content"
						id="content"
						cols="18"
						rows="8"
						bind:value={addCopypaste.content}
						class="rounded-md py-1.5 px-2 bg-transparent border border-slate-600 focus:border-purple-400 transition-[border-color] duration-300 outline-none text-sm"
					></textarea>
				</div>
				<button
					type="submit"
					class="bg-purple-700 hover:bg-purple-500 hover:scale-105 transition-[background-color, scale] duration-200 w-fit p-2 rounded-md text-sm self-center mt-4"
					>Add copypaste</button
				>
			</form>
		</div>
	{/if}
</div>
