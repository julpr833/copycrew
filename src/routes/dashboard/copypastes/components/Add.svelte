<script lang="ts">
	import { toasts } from 'svelte-toasts';
	import { blur } from 'svelte/transition';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { copypastesStore } from '../stores/copypaste.store';

	type CopypasteForm = {
		showModal: boolean;
		toggleModal: () => void;

		title: string;
		content: string;

		categoryButton: HTMLButtonElement | null;
		categoryInput: string;
		categories: string[];
	};

	let addCopypaste: CopypasteForm = {
		showModal: false,
		toggleModal: () => (addCopypaste.showModal = !addCopypaste.showModal),

		title: '',
		content: '',

		categoryButton: null,
		categoryInput: '',
		categories: []
	};

	const handleAddCategory = () => {
		if (addCopypaste.categoryInput) {
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

					if (addCopypaste.categories.length < 1) {
						toasts.error('At least one category is required');
						cancel();
						return;
					}

					return async ({ result }) => {
						if (result.type === 'error') {
							toasts.error(result.error.message);
						}

						if (result.type === 'success') {
							await applyAction(result);

							invalidateAll();

							toasts.success('Copypaste added succesfully');

							// nah i cba, i can't find any info on how to fix this
							// @ts-ignore
							$copypastesStore = [...$copypastesStore, result.data];
							addCopypaste.title = '';
							addCopypaste.content = '';
							addCopypaste.categories = [];
							addCopypaste.toggleModal();
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
				<div class="flex flex-col my-2">
					<label for="categories" class="text-xs mb-1 ml-1 font-semibold w-fit">Add category</label>
					<div class="flex gap-2">
						<input
							type="text"
							id="categories"
							class="rounded-md max-w-28 text-sm py-1 px-2 bg-transparent border border-slate-600 focus:border-purple-400 transition-[border-color] duration-300 outline-none"
							bind:value={addCopypaste.categoryInput}
						/>
						<button
							type="button"
							bind:this={addCopypaste.categoryButton}
							on:click={handleAddCategory}
							class="bg-purple-800/50 hover:bg-purple-500/50 transition-[background-color] duration-200 w-fit rounded-full p-1"
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
					type="submit"
					class="bg-purple-700 hover:bg-purple-500 hover:scale-105 transition-[background-color, scale] duration-200 w-fit p-2 rounded-md text-sm self-center mt-4"
					>Add copypaste</button
				>
			</form>
		</div>
	{/if}
</div>

<style>
	:global(.shake-error) {
		animation: shake 0.82s infinite cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
		transform: translate3d(0, 0, 0);
		transition-duration: 100ms;
		background-color: #bd3636;
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