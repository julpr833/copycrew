<script lang="ts">
	import { toasts } from 'svelte-toasts';
	import { type Copypaste } from '$lib/types/types';

	// Props
	export let data;

	// Variables
	let { copypastes }: { copypastes: Copypaste[] } = data;

	// Functions
	const copyText = (event: MouseEvent) => {
		if (event.target instanceof HTMLElement) {
			try {
				navigator.clipboard.writeText(event.target.innerText);
			} catch (error) {
				return toasts.error(
					"Failed to copy text, check for this page's permissions to your clipboard"
				);
			}
		}

		toasts.success('Copypaste copied succesfully');
	};
</script>

<div class="flex flex-wrap items-center justify-center">
	{#key copypastes}
		{#if !data.error && copypastes}
			{#each copypastes as copypaste}
				<div
					class="flex text-black dark:text-white bg-slate-900 flex-col p-3 m-4 rounded-lg cursor-pointer mt-12 _box-shadow-hover min-w-48"
				>
					<button
						class="flex items-center text-center w-full border-b-[1.5px] border-gray-700 dark:border-gray-500 mb-1"
					>
						<h2 class="font-bold text-purple-300 py-1 w-full">
							{copypaste.title}
						</h2>
					</button>

					<button class="max-w-[21rem] text-sm break-words" on:click={copyText}>
						{copypaste.content}
					</button>
					<p class="mt-2 text-purple-200">
						{copypaste.categories.map((c) => ' ' + c)}
					</p>
				</div>
			{/each}

			{#if copypastes.length === 0}
				<h2
					class=" text-transparent bg-gradient-to-r from-blue-200 via-purple-300 to-purple-600 bg-clip-text text-3xl font-bold max-w-xl text-center mt-12"
				>
					You have no copypastas yet, press the add button to create one.
				</h2>
			{/if}
		{/if}
	{/key}

	{#if data.error}
		<h2 class="text-red-400 text-3xl font-bold max-w-xl text-center mt-14">{data.error}</h2>
	{/if}
</div>

<style>
	._box-shadow-hover {
		transition: box-shadow;
		transition-duration: 300ms;
	}

	._box-shadow-hover:hover {
		box-shadow: 0px 0px 12px 8px #816a8f;
	}
</style>
