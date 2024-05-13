<script lang="ts">
	import { fade } from 'svelte/transition';
	import { applyAction, enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toasts } from 'svelte-toasts';
	import { goto } from '$app/navigation';

	// Props
	export let group;

	type AddCopypaste = {
		showForm: boolean;
		toggleForm: () => void;
		categoryInput: HTMLInputElement | null;
		categoryAddButton: HTMLButtonElement | null;
		categories: string[];
		creating: boolean;
	};

	let addCopypaste: AddCopypaste = {
		showForm: false,
		toggleForm: () => (addCopypaste.showForm = !addCopypaste.showForm),

		categoryInput: null,
		categoryAddButton: null,
		categories: [],

		creating: false
	};

	const handleAddCategory = (event: MouseEvent) => {
		if (
			!addCopypaste.categoryInput ||
			!addCopypaste.categoryInput.value ||
			addCopypaste.categories.includes(addCopypaste.categoryInput.value)
		) {
			if (addCopypaste.categoryAddButton) {
				addCopypaste.categoryAddButton.classList.add('shake-error');

				setTimeout(() => {
					(addCopypaste.categoryAddButton as HTMLButtonElement).classList.remove('shake-error');
				}, 800);
			}
			return;
		}

		addCopypaste.categories = [...addCopypaste.categories, addCopypaste.categoryInput.value];
		addCopypaste.categoryInput.value = '';
		addCopypaste.categoryInput.focus();
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

		if (addCopypaste.categories.some((category) => category.includes(' '))) {
			toasts.error('Categories cannot contain spaces');
			cancel();
			return;
		}

		addCopypaste.creating = true;

		return ({ result, update }) => {
			addCopypaste.creating = false;

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
					toasts.success('Copypaste added succesfully');
					addCopypaste.showForm = false;
					break;
			}
		};
	};
</script>

<div class="relative flex w-full justify-center my-4">
	<button
		on:click={addCopypaste.toggleForm}
		class={`${!addCopypaste.showForm ? 'bg-purple-800 hover:bg-purple-600' : 'bg-red-800 hover:bg-red-500 rotate-45'} hover:scale-110 rounded-xl p-1.5 transition-[background-color, transform] duration-200`}
	>
		<svg
			class="stroke-white"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M12 5l0 14" />
			<path d="M5 12l14 0" />
		</svg>
	</button>
	{#if addCopypaste.showForm}
		<div class="absolute top-12 z-10" transition:fade={{ duration: 150 }}>
			<form action="?/add" method="POST" use:enhance={handleForm}>
				<input type="hidden" name="group" value={group.id} />
				<div class="flex flex-col">
					<div class="bg-slate-900 p-2.5 rounded-t-lg">
						<h2 class="font-medium text-white">Add a copypaste</h2>
					</div>
					<div class="flex flex-col bg-slate-800 p-4 caret-white">
						<input
							type="text"
							name="title"
							placeholder="Title"
							class="bg-transparent px-2 py-1.5 border font-semibold text-purple-200 border-slate-400 rounded-xl outline-none focus:border-purple-400 transition-[border-color] duration-200"
						/>
						<div class="flex flex-col mt-4 mb-2">
							<label for="content" class="text-white font-bold tracking-wide text-xs ml-1.5 mb-0.5"
								>Content</label
							>
							<textarea
								name="content"
								class=" text-sm text-white bg-transparent px-2 py-2.5 border border-slate-400 rounded-xl outline-none focus:border-purple-400 transition-[border-color] duration-200"
							/>
						</div>
						<div class="flex flex-col">
							<label
								for="category-add"
								class="text-white font-bold tracking-wide text-xs ml-1.5 mb-0.5">Categories</label
							>
							<div class="flex gap-1.5 items-center">
								<input
									type="text"
									id="category-add"
									bind:this={addCopypaste.categoryInput}
									class="bg-transparent max-w-24 text-xs text-white px-1 py-1 border border-slate-400 rounded-xl outline-none focus:border-purple-400 transition-[border-color] duration-200"
								/>
								<button
									type="button"
									on:click={handleAddCategory}
									bind:this={addCopypaste.categoryAddButton}
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
							<div class="flex flex-wrap gap-1.5 my-2">
								{#each addCopypaste.categories as category}
									<button
										type="button"
										class="text-[12px] font-bold text-black bg-slate-400 enabled:hover:bg-red-200 transition-[background-color] duration-200 p-0.5 rounded-md"
										disabled={addCopypaste.creating || addCopypaste.categories.length <= 1}
										on:click={() =>
											(addCopypaste.categories = addCopypaste.categories.filter(
												(c) => c !== category
											))}>{category}</button
									>
								{/each}
								<input
									type="hidden"
									name="categories"
									value={JSON.stringify(addCopypaste.categories)}
								/>
							</div>
						</div>
					</div>
					<div class="bg-slate-900 p-2.5 rounded-b-lg flex justify-end">
						<button
							type="submit"
							disabled={addCopypaste.creating}
							class="text-white bg-purple-500 hover:bg-purple-400 transition-[background-color] disabled:bg-slate-400 disabled:border disabled:border-white duration-200 py-1.5 px-2 rounded-md"
						>
							{#if !addCopypaste.creating}Add{:else}
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
					</div>
				</div>
			</form>
		</div>
	{/if}
</div>

<style>
	.spin {
		animation: spin 1s infinite;
	}

	:global(.shake-error) {
		animation: shake 0.82s infinite cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
		transform: translate3d(0, 0, 0);
		transition-duration: 100ms;
		background-color: #bd3636 !important;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes shake {
		10%,
		90% {
			transform: translate3d(-1px, 0, 0);
		}
		20%,
		80% {
			transform: translate3d(2px, 0, 0);
		}
		30%,
		50%,
		70% {
			transform: translate3d(-4px, 0, 0);
		}
		40%,
		60% {
			transform: translate3d(4px, 0, 0);
		}
	}
</style>
