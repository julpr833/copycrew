<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toasts } from 'svelte-toasts';
	import { fade } from 'svelte/transition';

	// Props
	export let name;
	export let id;

	const renameGroup = {
		showForm: false,
		toggleForm: () => (renameGroup.showForm = !renameGroup.showForm),

		submitting: false
	};

	const handleForm: SubmitFunction = async ({ cancel, formData }) => {
		const name = formData.get('name')?.toString();

		if (!name) {
			toasts.error('Name is required');
			cancel();
			return;
		}

		if (name.length < 4 || name.length > 32) {
			toasts.error('Name must be between 4 and 32 characters long');
			cancel();
			return;
		}

		renameGroup.submitting = true;

		return async ({ result, update }) => {
			renameGroup.submitting = false;
			switch (result.type) {
				case 'success':
					toasts.success('Group renamed succesfully!');
					renameGroup.showForm = false;
					update();
					break;
				case 'error':
					toasts.error(result.error.message);
					break;
				case 'redirect':
					cancel();
					goto(result.location);
					break;
				default:
					break;
			}
		};
	};
</script>

<button class="py-0.5 -mx-2" on:click={renameGroup.toggleForm}>
	<svg
		class="stroke-white hover:fill-blue-500 transition-[fill] duration-200"
		width="30"
		height="30"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
		<path d="M13.5 6.5l4 4" />
	</svg>
</button>

{#if renameGroup.showForm}
	<div
		transition:fade={{ duration: 180 }}
		role="dialog"
		class="text-white fixed z-10 bg-slate-900/50 h-full w-full top-0 left-0 flex flex-col items-center justify-center"
	>
		<div class="max-w-96 w-fit sm:w-full">
			<div class="bg-slate-950 p-4 rounded-t-lg">
				<h1 class="text-2xl font-bold">Rename group</h1>
			</div>
			<form action="?/renameGroup" method="POST" use:enhance={handleForm}>
				<input type="hidden" name="group_id" value={id} />
				<div class="bg-slate-900 p-4 flex flex-col">
					<label for="name" class="text-xs font-medium tracking-wide mb-1.5 pl-2">Group name</label>
					<input
						type="text"
						name="name"
						value={name}
						class="bg-transparent px-2 py-2.5 border border-slate-400 rounded-xl outline-none focus:border-purple-400 transition-[border-color] duration-200"
					/>
				</div>
				<div class="bg-[#0d0f29] p-4 rounded-b-lg flex justify-end gap-3">
					<button
						disabled={renameGroup.submitting}
						class="bg-blue-500 hover:bg-blue-400 transition-[background-color] disabled:bg-slate-400 disabled:border disabled:border-white duration-200 py-1.5 px-2 rounded-md"
						>{#if !renameGroup.submitting}Rename{:else}
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
						{/if}</button
					>
					<button
						class="bg-red-500 hover:bg-red-400 transition-[background-color] duration-200 py-1.5 px-2 rounded-md"
						type="button"
						on:click={renameGroup.toggleForm}>Cancel</button
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
