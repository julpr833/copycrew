<script lang="ts">
	import { fade } from 'svelte/transition';
	import { applyAction, enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { toasts } from 'svelte-toasts';

	import { slide } from 'svelte/transition';

	const joinGroup = {
		showForm: false,
		toggleForm: () => (joinGroup.showForm = !joinGroup.showForm),

		errorMessage: '',

		submitting: false
	};

	$: if (!joinGroup.showForm) joinGroup.errorMessage = '';

	const handleForm: SubmitFunction = async ({ cancel, formData }) => {
		const inviteCode = formData.get('inviteCode')?.toString();

		if (!inviteCode) {
			joinGroup.errorMessage = 'Please enter an invite code';
			cancel();
			return;
		}

		joinGroup.submitting = true;

		return async ({ result, update }) => {
			joinGroup.submitting = false;
			switch (result.type) {
				case 'success':
					applyAction(result);
					update();
					toasts.success('You have joined the group successfully');
					joinGroup.showForm = false;
					joinGroup.submitting = false;
					break;
				case 'error':
					joinGroup.errorMessage = result.error.message;
					break;
				case 'redirect':
					cancel();
					goto(result.location);
					break;
			}
		};
	};
</script>

<button class="h-fit" on:click={joinGroup.toggleForm}>
	<div
		class="flex flex-col text-center bg-slate-300/70 dark:bg-slate-900 p-5 h-40 max-w-xl rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
	>
		<h2
			class="text-purple-600 dark:text-purple-400 text-2xl font-bold flex items-center gap-2 self-center"
		>
			<span
				><svg
					class="stroke-black dark:stroke-white"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					fill="#6f59db"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M5 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
					<path d="M3 21v-2a4 4 0 0 1 4 -4h4c.96 0 1.84 .338 2.53 .901" />
					<path d="M16 3.13a4 4 0 0 1 0 7.75" />
					<path d="M16 19h6" />
					<path d="M19 16v6" />
				</svg></span
			>Join group
		</h2>
		<p class="pt-3 font-semibold">
			Enter your invite code and join a group to share copypastes with your friends.
		</p>
	</div>
</button>

{#if joinGroup.showForm}
	<div
		transition:fade={{ duration: 180 }}
		role="dialog"
		class="fixed z-10 bg-slate-900/50 h-full w-full top-0 left-0 flex flex-col items-center justify-center"
	>
		<div class="max-w-md">
			<form action="?/join" method="POST" use:enhance={handleForm}>
				<div class="flex bg-[#3B234F] dark:bg-slate-900 p-4 rounded-t-lg">
					<div
						class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-white dark:bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10"
					>
						<svg class="h-6 w-6 dark:stroke-yellow-800 dark:fill-orange-600" viewBox="0 0 24 24">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M5 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
							<path d="M3 21v-2a4 4 0 0 1 4 -4h4c.96 0 1.84 .338 2.53 .901" />
							<path d="M16 3.13a4 4 0 0 1 0 7.75" />
							<path d="M16 19h6" />
							<path d="M19 16v6" />
						</svg>
					</div>
					<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
						<h3 class="text-white text-lg leading-6 font-medium" id="modal-title">Join group</h3>
						<div class="mt-2">
							<p class="text-balance text-sm text-gray-200 dark:text-gray-400">
								Enter the unique, one-use invite code, you can get this code from your friends and
								it will regenerate after usage.
							</p>
						</div>
					</div>
				</div>
				<div
					class="flex flex-col justify-center bg-slate-400 dark:bg-slate-800 px-4 pt-4 pb-4 sm:p-5 sm:pb-3"
					transition:slide
				>
					<input
						name="inviteCode"
						type="text"
						class=" font-bold dark:font-normal bg-transparent border placeholder:text-black/80 dark:placeholder:text-slate-400 border-black dark:border-slate-400 outline-none focus:border-orange-400 transition-[border-color] duration-200 p-2 rounded-lg min-w-full"
						placeholder="Invite code"
					/>
					{#if joinGroup.errorMessage}
						<p class="text-xs px-2 pt-2 text-red-500" transition:slide>{joinGroup.errorMessage}</p>
					{/if}
				</div>
				<div class="flex gap-2 bg-[#3B234F] dark:bg-slate-900 p-4 rounded-b-lg">
					<button
						type="submit"
						disabled={joinGroup.submitting}
						class="w-full flex justify-center disabled:bg-slate-400 bg-violet-500 hover:bg-violet-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 transition-[background-color] duration-200 text-white font-bold py-2 px-4 rounded"
					>
						{#if !joinGroup.submitting}
							Join
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
						on:click={() => (joinGroup.showForm = false)}
						class="w-full bg-slate-400 dark:bg-slate-700 hover:bg-slate-800 transition-[background-color] duration-200 text-white font-bold py-2 px-4 rounded"
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
