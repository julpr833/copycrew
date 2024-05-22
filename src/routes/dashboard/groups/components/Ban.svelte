<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toasts } from 'svelte-toasts';
	import { fade } from 'svelte/transition';

	export let member;

	const banMember = {
		showForm: false,
		toggleForm: () => (banMember.showForm = !banMember.showForm),

		submitting: false
	};

	const handleForm: SubmitFunction = async ({ cancel, formData }) => {
		banMember.submitting = true;
		return async ({ result, update }) => {
			banMember.submitting = false;
			switch (result.type) {
				case 'success':
					await update();
					applyAction(result);
					banMember.showForm = false;
					toasts.success('Member kicked');
					break;
				case 'error':
					toasts.error(result.error.message);
					break;
				case 'redirect':
					goto(result.location);
					break;
			}
		};
	};
</script>

<button
	type="button"
	on:click={banMember.toggleForm}
	class="text-sm font-medium flex items-center gap-1 py-1 px-1.5 bg-red-500 rounded-md hover:bg-red-300 transition-[background-color] duration-200"
>
	<svg
		class="stroke-white fill-none"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		stroke-width="2.5"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		<path d="M5.7 5.7l12.6 12.6" />
	</svg>
	Ban
</button>

{#if banMember.showForm}
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
							Are you sure you want to permanently ban <span class="text-purple-300"
								>{member.id.username}</span
							>?
						</h3>
						<div class="mt-2">
							<p class="text-sm text-gray-400">
								All the information related to him will be deleted. He won't be able to join this
								group again
							</p>
						</div>
					</div>
				</div>
			</div>

			<div
				class="bg-slate-900 px-4 py-3 sm:px-6 flex gap-3 justify-center sm:justify-end text-white"
			>
				<form action="?/banMember" method="POST" use:enhance={handleForm}>
					<input type="hidden" name="member_id" value={member.user_id} />
					<input type="hidden" name="group_id" value={member.group_id} />
					<button
						type="submit"
						disabled={banMember.submitting}
						class="bg-red-500 hover:bg-red-400 transition-[background-color] disabled:bg-slate-400 disabled:border disabled:border-white duration-200 py-1.5 px-2 rounded-md"
						>{#if !banMember.submitting}Ban{:else}
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
					on:click={() => (banMember.showForm = false)}
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
