<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { copypastesStore } from '../stores/copypaste.store';
	import { page } from '$app/stores';
	import { applyAction, enhance } from '$app/forms';
	import { toasts } from 'svelte-toasts';
	import { goto, invalidateAll } from '$app/navigation';

	export let copypaste: {
		id: number;
		title: string;
		categories: string[];
		content: string;
		author_id: number;
		group_id: number | null;
	};

	let formElement: HTMLFormElement | null = null;
	let showModal = false;

	let editAddCategoryInput: string = '';
	let editCategories: string[] = copypaste.categories;
	let editAddCategoryButton: HTMLButtonElement | null = null;

	let editPending = false;

	const handleEditCategory = () => {
		if (editAddCategoryInput) {
			if (editAddCategoryInput.includes(' ')) return toasts.error('Category cannot contain spaces');

			editCategories = [...editCategories, editAddCategoryInput];
			editAddCategoryInput = '';
		} else {
			if (editAddCategoryButton instanceof HTMLButtonElement) {
				editAddCategoryButton.classList.toggle('shake-error');
				setTimeout(() => {
					(editAddCategoryButton as HTMLButtonElement).classList.toggle('shake-error');
				}, 1000);
			}
		}
	};
</script>

<button on:click={() => ((showModal = true), (editCategories = copypaste.categories))}>
	<svg
		class="stroke-white py-0.5 -mx-0.5 hover:stroke-blue-500 transition-[stroke] duration-200"
		width="30"
		height="30"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
		<line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
	</svg>
</button>

{#if showModal}
	<div
		transition:fade={{ duration: 180 }}
		class="fixed inset-0 z-50 overflow-y-auto"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
	>
		<div
			class="flex justify-center items-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
		>
			<div
				class="fixed inset-0 transition-opacity"
				aria-hidden="true"
				on:click={() => (showModal = false)}
			>
				<div class="absolute inset-0 bg-slate-800/70" />
			</div>
			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
				>&#8203;</span
			>
			<div
				class="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
			>
				<div class="bg-purple-900 dark:bg-slate-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<div class="sm:flex sm:items-start">
						<div
							class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
						>
							<svg
								class="h-6 w-6 text-blue-400"
								stroke="currentColor"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
								/>
							</svg>
						</div>
						<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<h3 class="text-lg leading-6 font-medium text-balance text-white" id="modal-title">
								You are currently editing <span class="text-purple-200 dark:text-purple-300"
									>"{copypaste.title}"</span
								>
							</h3>
						</div>
					</div>
				</div>
				<div
					class="bg-purple-300 dark:bg-[#152642] px-4 py-3 sm:px-6 flex justify-center"
					transition:slide
				>
					<form
						action="?/edit"
						method="POST"
						bind:this={formElement}
						use:enhance={({ cancel, formData }) => {
							const title = formData.get('title')?.toString();
							const content = formData.get('content')?.toString();
							const categories = formData.get('categories')?.toString();

							if (!title || !content) {
								toasts.error(`${!title ? 'Title' : 'Content'} is required`);
								cancel();
								return;
							}

							if (title.length < 4) {
								toasts.error('Title must be at least 4 characters long');
								cancel();
								return;
							}

							if (title.length > 64) {
								toasts.error('Title cannot be more than 32 characters long');
								cancel();
								return;
							}

							if (editCategories.some((category) => category.includes(' '))) {
								toasts.error('Categories cannot contain spaces');
								cancel();
								return;
							}

							if (!categories) {
								toasts.error("This error shouldn't even happen, stop messing around...");
								cancel();
								return;
							}

							const parsedCategories = JSON.parse(categories);

							if (parsedCategories.length < 1) {
								toasts.error('At least one category is required');
								cancel();
								return;
							}

							editPending = true;

							return async ({ result }) => {
								editPending = false;

								if (result.type === 'error') {
									toasts.error(result.error.message);
								}

								if (result.type === 'redirect') {
									await goto(result.location);
								}

								if (result.type === 'success') {
									invalidateAll();
									await applyAction(result);

									if (result.data) {
										let editIndex = $copypastesStore.findIndex(
											(copypaste) => copypaste.id === $page.form.id
										);
										$copypastesStore[editIndex] = $page.form;
									}

									toasts.success('Changes applied succesfully');
									showModal = false;
								}
							};
						}}
					>
						<input type="hidden" name="id" value={copypaste.id} />
						<div class="flex flex-col mb-4">
							<label
								class="font-bold dark:font-normal text-sm my-1 tracking-widest transition-colors duration-300"
								for="title">Title</label
							>
							<input
								type="text"
								name="title"
								id="title"
								value={copypaste.title}
								class="rounded-md w-72 p-2 bg-transparent border border-black dark:border-white text-purple-950 dark:text-purple-200 focus:outline-none text-md font-semibold focus:border-purple-400 transition-[border-color] duration-200"
							/>
						</div>

						<div class="flex flex-col mb-4">
							<label
								class="font-bold dark:font-normal text-sm my-1 tracking-widest transition-colors duration-300"
								for="content">Content</label
							>
							<textarea
								name="content"
								id="content"
								cols="18"
								rows="8"
								value={copypaste.content}
								class="rounded-md w-72 p-2 bg-transparent border border-black dark:border-white focus:outline-none text-sm focus:border-purple-400 transition-[border-color] duration-200"
							/>
						</div>
						<div class="flex flex-col my-4">
							<div class="flex flex-col gap-2">
								<label for="add-category" class="font-bold dark:font-normal text-sm tracking-widest"
									>Add category</label
								>
								<div class="flex gap-2">
									<input
										type="text"
										id="add-category"
										bind:value={editAddCategoryInput}
										class="rounded-md max-w-28 text-sm py-1 px-2 bg-transparent border border-black dark:border-white focus:border-purple-400 transition-[border-color] duration-300 outline-none"
									/>
									<button
										type="button"
										on:click={handleEditCategory}
										bind:this={editAddCategoryButton}
										disabled={editPending}
										class="enabled:bg-purple-600/80 enabled:hover:bg-purple-400/50 enabled:transition-[background-color] duration-200 w-fit rounded-full p-1 disabled:bg-slate-500"
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
							</div>
							<div class="flex flex-col mt-4">
								<label
									class="font-bold dark:font-normal text-sm my-1 tracking-widest transition-colors duration-300"
									for="categories">Categories</label
								>
								<div class="flex flex-wrap gap-1" id="categories">
									{#each editCategories as category}
										<button
											on:click={() =>
												(editCategories = editCategories.filter((c) => c !== category))}
											type="button"
											disabled={editCategories.length === 1}
											class=" text-white bg-purple-700/50 dark:bg-slate-600/50 enabled:hover:bg-red-400/50 transition-[background-color] duration-200 rounded-md p-1 px-1.5 cursor-pointer"
										>
											{category}
										</button>
									{/each}
								</div>
							</div>
						</div>
						<input type="hidden" name="categories" value={JSON.stringify(editCategories)} />
					</form>
				</div>
				<div
					class="bg-purple-950 dark:bg-[#0e1b31] px-4 py-3 sm:px-6 flex justify-center sm:justify-end gap-3"
				>
					<button
						type="submit"
						on:click={() => formElement?.requestSubmit()}
						disabled={editPending}
						class="text-white font-semibold enabled:min-w-20 disabled:border border-white disabled:bg-slate-500 enabled:bg-blue-500 enabled:hover:bg-blue-400 transition-[background-color] duration-200 py-1.5 px-2 rounded-md"
					>
						{#if !editPending}
							Save
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
					<button
						type="button"
						on:click={() => ((showModal = false), (editCategories = copypaste.categories))}
						class="text-white font-semibold min-w-20 bg-red-500 hover:bg-red-400 transition-[background-color] duration-200 py-1.5 px-2 rounded-md"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

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
