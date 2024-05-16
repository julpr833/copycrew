<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toasts } from 'svelte-toasts';
	import { fade } from 'svelte/transition';

	// Group id
	export let id;

	let deleteGroup = {
		showForm: false,
		toggleForm: () => (deleteGroup.showForm = !deleteGroup.showForm),

		submitting: false
	};

	const handleForm: SubmitFunction = async ({ cancel, formData }) => {
		deleteGroup.submitting = true;

		return async ({ result, update }) => {
			deleteGroup.submitting = false;
			switch (result.type) {
				case 'error':
					toasts.error(result.error.message);
					break;
				case 'redirect':
					cancel();
					goto(result.location);
					break;
				case 'success':
					toasts.success('Group deleted succesfully');
					deleteGroup.showForm = false;
					update();
					applyAction(result);
					break;
				default:
					break;
			}
		};
	};
</script>

<button on:click={deleteGroup.toggleForm} class="text-red-400"
	><svg
		class="fill-white py-0.5 -mx-0.5 hover:fill-red-500 transition-[fill] duration-200"
		width="30"
		height="30"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path
			d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
			stroke-width="0"
		/>
	</svg></button
>

{#if deleteGroup.showForm}
	<div
		transition:fade={{ duration: 180 }}
		class="fixed z-50 top-0 left-0 w-full h-full bg-slate-800/50"
	>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<div class="bg-slate-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-t-lg">
				<div class="sm:flex sm:items-start">
					<div
						class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
					>
						<svg class="h-6 w-6 text-red-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
					<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
						<h3 class="text-white text-lg leading-6 font-medium" id="modal-title">
							Are you sure you want to delete this group?
						</h3>
						<div class="mt-2">
							<p class="text-sm text-gray-400">
								All related copypastes will be deleted, you cannot undo this process.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div
				class="bg-slate-900 px-4 py-3 sm:px-6 flex gap-3 justify-center sm:justify-end text-white"
			>
				<form action="?/deleteGroup" method="POST" use:enhance={handleForm}>
					<input type="hidden" name="group_id" value={id} />
					<button
						type="submit"
						disabled={deleteGroup.submitting}
						class="bg-red-500 hover:bg-red-400 transition-[background-color] disabled:bg-slate-400 disabled:border disabled:border-white duration-200 py-1.5 px-2 rounded-md"
						>{#if !deleteGroup.submitting}Delete{:else}
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
								<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
							</svg>
						{/if}</button
					>
				</form>
				<button
					type="button"
					class="py-1.5 px-2 rounded-md border border-white hover:bg-white hover:text-black transition-[background-color, color] duration-200"
					on:click={() => (deleteGroup.showForm = false)}
				>
					Cancel
				</button>
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
