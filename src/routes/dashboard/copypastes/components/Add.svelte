<script lang="ts">
	import { toasts } from 'svelte-toasts';
	import { blur } from 'svelte/transition';
	import { applyAction, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { copypastesStore } from '../stores/copypaste.store';
	import { page } from '$app/stores';

	type CopypasteForm = {
		showModal: boolean;
		toggleModal: () => void;

		title: string;
		content: string;

		categoryButton: HTMLButtonElement | null;
		categoryInput: string;
		categories: string[];

		loading: boolean;
	};

	let addCopypaste: CopypasteForm = {
		showModal: false,
		toggleModal: () => (addCopypaste.showModal = !addCopypaste.showModal),

		title: '',
		content: '',

		categoryButton: null,
		categoryInput: '',
		categories: [],

		loading: false
	};

	const handleAddCategory = () => {
		if (addCopypaste.categoryInput) {
			if (addCopypaste.categoryInput.includes(' '))
				return toasts.error('Category cannot contain spaces');
			addCopypaste.categories = [...addCopypaste.categories, addCopypaste.categoryInput];
			addCopypaste.categoryInput = '';
		} else {
			if (addCopypaste.categoryButton instanceof HTMLButtonElement) {
				addCopypaste.categoryButton.classList.toggle('shake-error');
				setTimeout(() => {
					(addCopypaste.categoryButton as HTMLButtonElement).classList.toggle('shake-error');
				}, 1000);
			}
		}
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
				class="flex flex-col bg-[#3B234F]/80 dark:bg-slate-950/60 text-white p-6 rounded-md"
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

					if (addCopypaste.title.length > 64) {
						toasts.error('Title cannot be more than 32 characters long');
						cancel();
						return;
					}

					if (addCopypaste.categories.length < 1) {
						toasts.error('At least one category is required');
						cancel();
						return;
					}

					if (addCopypaste.categories.some((c) => c.includes(' '))) {
						toasts.error('Categories cannot contain spaces');
						cancel();
						return;
					}

					addCopypaste.loading = true;

					return async ({ result }) => {
						if (result.type === 'error') {
							toasts.error(result.error.message);
						}

						if (result.type === 'redirect') {
							await goto(result.location);
						}

						if (result.type === 'success') {
							await applyAction(result);

							invalidateAll();

							toasts.success('Copypaste added succesfully');

							if (result.data) {
								$copypastesStore = [$page.form, ...$copypastesStore];
							}
							addCopypaste.title = '';
							addCopypaste.content = '';
							addCopypaste.categories = [];
							addCopypaste.toggleModal();

							addCopypaste.loading = false;
						}
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
						class="rounded-md py-1.5 px-2 bg-transparent border placeholder:text-purple-50 border-white dark:border-slate-600 focus:border-purple-300 dark:focus:border-purple-400 transition-[border-color] duration-300 outline-none"
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
						class="rounded-md py-1.5 px-2 bg-transparent border border-white dark:border-slate-600 focus:border-purple-300 dark:focus:border-purple-400 transition-[border-color] duration-300 outline-none text-sm"
					></textarea>
				</div>
				<div class="flex flex-col my-2">
					<label for="categories" class="text-xs mb-1 ml-1 font-semibold w-fit">Add category</label>
					<div class="flex gap-2">
						<input
							type="text"
							id="categories"
							class="rounded-md max-w-28 text-sm py-1 px-2 bg-transparent border border-white dark:border-slate-600 focus:border-purple-300 dark:focus:border-purple-400 transition-[border-color] duration-300 outline-none"
							bind:value={addCopypaste.categoryInput}
						/>
						<button
							type="button"
							bind:this={addCopypaste.categoryButton}
							disabled={addCopypaste.loading}
							on:click={handleAddCategory}
							class="enabled:bg-purple-800/50 enabled:hover:bg-purple-500/50 enabled:transition-[background-color] duration-200 w-fit rounded-full p-1 disabled:bg-slate-500"
							><svg
								class="stroke-white"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M4 4h6v6h-6zm10 0h6v6h-6zm-10 10h6v6h-6zm10 3h6m-3 -3v6" />
							</svg></button
						>
					</div>
					{#if addCopypaste.categories.length > 0}
						<div class="pt-2 max-w-64">
							<p class="text-xs mb-1 ml-1 font-semibold">Categories</p>

							<div class="flex flex-wrap gap-1">
								{#each addCopypaste.categories as category}
									<button
										on:click={() =>
											(addCopypaste.categories = addCopypaste.categories.filter(
												(c) => c !== category
											))}
										type="button"
										class="text-xs bg-slate-600/50 hover:bg-red-400/50 transition-[background-color] duration-200 rounded-md p-1 cursor-pointer"
									>
										{category}
									</button>
								{/each}
							</div>
						</div>
					{/if}
				</div>
				<input type="hidden" name="categories" value={JSON.stringify(addCopypaste.categories)} />
				<button
					disabled={addCopypaste.loading}
					type="submit"
					class="enabled:bg-purple-700 enabled:hover:bg-purple-500 enabled:hover:scale-105 enabled:transition-[background-color, scale] duration-200 w-fit p-2 rounded-md text-sm self-center mt-4 disabled:bg-slate-500"
				>
					{#if !addCopypaste.loading}
						Add copypaste
					{:else}
						<svg
							class="stroke-white spin"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M12 3a9 9 0 1 0 9 9" />
						</svg>
					{/if}
				</button>
			</form>
		</div>
	{/if}
</div>

<style>
	.spin {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
