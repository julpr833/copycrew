<script lang="ts">
	import { fade } from 'svelte/transition';
	import { applyAction, enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toasts } from 'svelte-toasts';

	export let group_id;
	export let group_name;

	const leaveGroup = {
		showForm: false,
		toggleForm: () => (leaveGroup.showForm = !leaveGroup.showForm),

		submitting: false
	};

	const handleForm: SubmitFunction = async ({ cancel, formData }) => {
		leaveGroup.submitting = true;
		return async ({ result, update }) => {
			leaveGroup.submitting = false;
			switch (result.type) {
				case 'success':
					await update();
					applyAction(result);
					leaveGroup.showForm = false;
					toasts.success('You have left the group');
					break;
				case 'error':
					toasts.error(result.error.message);
					break;
				case 'redirect':
					cancel();
					break;
			}
		};
	};
</script>

<button
	on:click={leaveGroup.toggleForm}
	class="py-0.5 stroke-black dark:stroke-white hover:stroke-orange-500 transition-[stroke] duration-200"
>
	<svg
		width="28"
		height="28"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M13 12v.01" />
		<path d="M3 21h18" />
		<path d="M5 21v-16a2 2 0 0 1 2 -2h7.5m2.5 10.5v7.5" />
		<path d="M14 7h7m-3 -3l3 3l-3 3" />
	</svg>
</button>

{#if leaveGroup.showForm}
	<div
		transition:fade={{ duration: 180 }}
		role="dialog"
		class="fixed z-10 bg-slate-900/50 h-full w-full top-0 left-0 flex flex-col items-center justify-center"
	>
		<div class="max-w-md">
			<form action="?/leave" method="POST" use:enhance={handleForm}>
				<input type="hidden" name="group_id" value={group_id} />
				<div class="flex bg-purple-900 dark:bg-slate-900 p-4 rounded-t-lg">
					<div
						class="mx-auto flex-shrink-0 mt-2 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
					>
						<svg class="h-6 w-6 text-red-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path
								d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm.01 13l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z"
								stroke-width="0"
								fill="currentColor"
							/>
						</svg>
					</div>
					<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
						<h3 class="text-white text-balance text-lg leading-6 font-medium" id="modal-title">
							Are you sure you wanna leave <span class="text-red-300">{group_name}</span>?
						</h3>
						<div class="mt-2">
							<p class="text-sm text-gray-200 dark:text-gray-400">
								You can't undo this action and you will have to ask for another invite code to join
								again.
							</p>
						</div>
					</div>
				</div>

				<div class="flex gap-2 bg-purple-950 dark:bg-slate-900 p-4 rounded-b-lg">
					<button
						type="submit"
						disabled={leaveGroup.submitting}
						class="w-full flex justify-center disabled:bg-slate-400 bg-red-500 hover:bg-red-400 transition-[background-color] duration-200 text-white font-bold py-2 px-4 rounded"
					>
						{#if !leaveGroup.submitting}
							Leave
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
						on:click={() => (leaveGroup.showForm = false)}
						class="w-full bg-slate-500 dark:bg-slate-700 hover:bg-slate-800 transition-[background-color] duration-200 text-white font-bold py-2 px-4 rounded"
						>Cancel</button
					>
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
