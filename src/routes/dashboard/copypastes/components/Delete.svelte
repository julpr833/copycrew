<script lang="ts">
	import { fade } from 'svelte/transition';
	import { applyAction, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { toasts } from 'svelte-toasts';
	import { copypastesStore } from '../stores/copypaste.store';

	export let id;

	let showModal = false;
	let isDeleting = false;
</script>

<button on:click={() => (showModal = true)}>
	<svg
		class="stroke-white py-0.5 -mx-0.5 hover:stroke-red-500 transition-[stroke] duration-200"
		width="30"
		height="30"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<line x1="4" y1="7" x2="20" y2="7" />
		<line x1="10" y1="11" x2="10" y2="17" />
		<line x1="14" y1="11" x2="14" y2="17" />
		<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
		<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
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
				<div class="bg-slate-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<div class="sm:flex sm:items-start">
						<div
							class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
						>
							<svg
								class="h-6 w-6 text-red-600"
								stroke="currentColor"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
								/>
							</svg>
						</div>
						<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<h3 class="text-lg leading-6 font-medium" id="modal-title">
								Are you sure you want to delete this copypaste?
							</h3>
							<div class="mt-2">
								<p class="text-sm text-gray-400">This action cannot be undone.</p>
							</div>
						</div>
					</div>
				</div>
				<div class="bg-[#122037] px-4 py-3 sm:px-6 flex justify-center sm:justify-end gap-3">
					<form
						action="?/delete"
						method="POST"
						use:enhance={() => {
							isDeleting = true;
							return async ({ result }) => {
								if (result.type === 'success') {
									invalidateAll();
									applyAction(result);
									$copypastesStore = $copypastesStore.filter((copypaste) => copypaste.id !== id);
									toasts.success('Copypaste deleted successfully');
									showModal = false;
									isDeleting = false;
								}

								if (result.type === 'error') {
									toasts.error(result.error.message);
								}

								if (result.type === 'redirect') {
									await goto(result.location);
								}
							};
						}}
					>
						<input type="hidden" name="id" value={id} />
						<button
							type="submit"
							disabled={isDeleting}
							class="border border-white disabled:bg-slate-700 enabled:hover:bg-white enabled:transition-[background-color, color] duration-200 enabled:hover:text-black py-1.5 px-2 rounded-md"
						>
							{#if !isDeleting}
								Confirm
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
					<button
						type="button"
						on:click={() => (showModal = false)}
						class="bg-red-500 hover:bg-red-400 transition-[background-color] duration-200 py-1.5 px-2 rounded-md"
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
