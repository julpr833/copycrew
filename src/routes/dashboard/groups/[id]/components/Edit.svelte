<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toasts } from 'svelte-toasts';
	import { fade } from 'svelte/transition';

	export let copypaste;
	export let group_id;

	type EditCopypaste = {
		showForm: boolean;
		toggleForm: () => void;
		submitting: boolean;

		categoryInput: string;
		categoryAddButton: HTMLButtonElement | null;
		categories: string[];
	};

	const editCopypaste: EditCopypaste = {
		showForm: false,
		toggleForm: () => (
			(editCopypaste.showForm = !editCopypaste.showForm),
			(editCopypaste.categories = copypaste.categories)
		),
		submitting: false,

		categoryInput: '',
		categoryAddButton: null,
		categories: copypaste.categories
	};

	const handleEditCategory = () => {
		if (editCopypaste.categoryInput) {
			if (editCopypaste.categoryInput.includes(' '))
				return toasts.error('Category cannot contain spaces');

			if (editCopypaste.categories.includes(editCopypaste.categoryInput))
				return toasts.error('Category already exists');

			editCopypaste.categories = [...editCopypaste.categories, editCopypaste.categoryInput];
			editCopypaste.categoryInput = '';
		} else {
			if (editCopypaste.categoryAddButton instanceof HTMLButtonElement) {
				editCopypaste.categoryAddButton.classList.toggle('shake-error');
				setTimeout(() => {
					(editCopypaste.categoryAddButton as HTMLButtonElement).classList.toggle('shake-error');
				}, 1000);
			}
		}
	};

	const handleForm: SubmitFunction = async ({ cancel, formData }) => {
		const { title, content, categories: unparsedCategories } = Object.fromEntries(formData);
		const categories = JSON.parse(unparsedCategories as string);

		if (!title || !content) {
			toasts.error(`${!title ? 'Title' : 'Content'} is required`);
			cancel();
			return;
		}

		if (title.toString().length < 4 || title.toString().length > 32) {
			toasts.error('Title must be between 4 and 32 characters long');
			cancel();
			return;
		}

		if (categories.length < 1 || !categories) {
			toasts.error('At least one category is required');
			cancel();
			return;
		}

		if (editCopypaste.categories.some((category) => category.includes(' '))) {
			toasts.error('Categories cannot contain spaces');
			cancel();
			return;
		}

		editCopypaste.submitting = true;

		return ({ result, update }) => {
			editCopypaste.submitting = false;

			switch (result.type) {
				case 'error':
					toasts.error(result.error.message);
					break;
				case 'redirect':
					goto(result.location);
					break;
				case 'success':
					update();
					applyAction(result);
					toasts.success('Changes saved succesfully');
					editCopypaste.showForm = false;
					break;
			}
		};
	};
</script>

<button on:click={editCopypaste.toggleForm}>
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

{#if editCopypaste.showForm}
	<div
		transition:fade={{ duration: 180 }}
		class="fixed z-10 top-0 left-0 w-full h-full bg-slate-800/50"
	>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<form action="?/edit" method="POST" use:enhance={handleForm}>
				<div class="bg-slate-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-t-lg">
					<div class="sm:flex sm:items-center">
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
							<h3 class="text-white text-lg leading-6 font-medium text-balance" id="modal-title">
								You are currently editing <span class="text-purple-300">"{copypaste.title}"</span>
							</h3>
						</div>
					</div>
				</div>
				<div class="bg-[#152642] px-4 py-3 sm:px-6 flex flex-col text-white justify-center">
					<input type="hidden" name="id" value={copypaste.id} />
					<input type="hidden" name="group_id" value={group_id} />
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
							class="rounded-md w-72 p-2 bg-transparent border border-black dark:border-white text-purple-200 focus:outline-none text-md font-semibold focus:border-purple-400 transition-[border-color] duration-200"
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
									bind:value={editCopypaste.categoryInput}
									class="rounded-md max-w-28 text-sm py-1 px-2 bg-transparent border border-black dark:border-white focus:border-purple-400 transition-[border-color] duration-300 outline-none"
								/>
								<button
									type="button"
									on:click={handleEditCategory}
									bind:this={editCopypaste.categoryAddButton}
									disabled={editCopypaste.submitting}
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
								{#each editCopypaste.categories as category}
									<button
										on:click={() =>
											(editCopypaste.categories = editCopypaste.categories.filter(
												(c) => c !== category
											))}
										type="button"
										disabled={editCopypaste.categories.length === 1}
										class="bg-slate-600/50 enabled:hover:bg-red-400/50 transition-[background-color] duration-200 rounded-md p-1 px-1.5 cursor-pointer"
									>
										{category}
									</button>
								{/each}
							</div>
						</div>
					</div>
					<input type="hidden" name="categories" value={JSON.stringify(editCopypaste.categories)} />
				</div>
				<div
					class="bg-[#122037] px-4 py-3 sm:px-6 flex justify-center sm:justify-end gap-3 rounded-b-lg"
				>
					<button
						type="submit"
						disabled={editCopypaste.submitting}
						class="text-white border border-white bg-blue-500 disabled:bg-slate-700 enabled:hover:bg-white enabled:transition-[background-color, color] duration-200 enabled:hover:text-black py-1.5 px-2 rounded-md"
					>
						{#if !editCopypaste.submitting}Edit{:else}
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
						on:click={editCopypaste.toggleForm}
						type="button"
						class="text-white bg-red-500 disabled:bg-slate-700 enabled:hover:bg-white enabled:transition-[background-color, color] duration-200 enabled:hover:text-black py-1.5 px-2 rounded-md"
					>
						Cancel
					</button>
				</div>
			</form>
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
