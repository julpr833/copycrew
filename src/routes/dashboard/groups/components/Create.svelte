<script lang="ts">
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { toasts } from 'svelte-toasts';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { updated } from '$app/stores';

	let createGroup = {
		showForm: false,
		toggleForm: () => (createGroup.showForm = !createGroup.showForm),

		creating: false
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

		createGroup.creating = true;

		return async ({ result, update }) => {
			createGroup.creating = false;
			switch (result.type) {
				case 'success':
					toasts.success('Group created succesfully!');
					createGroup.showForm = false;
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

<button class="h-fit" on:click={createGroup.toggleForm}>
	<div
		class="flex flex-col text-center bg-slate-300 dark:bg-slate-900 p-5 h-40 max-w-xl rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
	>
		<h2
			class="text-purple-600 dark:text-purple-400 text-2xl font-bold flex items-center gap-2 self-center"
		>
			<span
				><svg
					class="stroke-white"
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
			>Create group
		</h2>
		<p class="pt-3">Make a group and share copypastes between you and the members of the group.</p>
	</div>
</button>

{#if createGroup.showForm}
	<div
		transition:fade={{ duration: 180 }}
		role="dialog"
		class="fixed z-50 bg-slate-900/50 h-full w-full top-0 left-0 flex flex-col items-center justify-center"
	>
		<div class="max-w-96 w-fit sm:w-full">
			<div class="bg-slate-950 p-4 rounded-t-lg">
				<h1 class="text-2xl font-bold">Create a group</h1>
			</div>
			<form action="?/create" method="POST" use:enhance={handleForm}>
				<div class="bg-slate-900 p-4 flex flex-col">
					<label for="name" class="text-xs font-medium tracking-wide mb-1.5 pl-2">Group name</label>
					<input
						type="text"
						name="name"
						placeholder="The crew"
						class="bg-transparent px-2 py-2.5 border border-slate-400 rounded-xl outline-none focus:border-purple-400 transition-[border-color] duration-200"
					/>
				</div>
				<div class="bg-[#0d0f29] p-4 rounded-b-lg flex justify-end gap-3">
					<button
						disabled={createGroup.creating}
						class="bg-blue-500 hover:bg-blue-400 transition-[background-color] disabled:bg-slate-400 disabled:border disabled:border-white duration-200 py-1.5 px-2 rounded-md"
						>{#if !createGroup.creating}Create{:else}
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
						on:click={createGroup.toggleForm}>Cancel</button
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
