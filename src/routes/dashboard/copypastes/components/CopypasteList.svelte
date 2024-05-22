<script lang="ts">
	import { copypastesStore } from '../stores/copypaste.store';
	import Copypaste from './Copypaste.svelte';
	import { get } from 'svelte/store';

	// Props
	export let data;

	copypastesStore.set(data.copypastes);
	let copypastes = get(copypastesStore);

	copypastesStore.subscribe((value) => {
		copypastes = value;
	});
</script>

<div class="flex flex-wrap items-center justify-center">
	{#key copypastes}
		{#if !data.error && copypastes}
			{#each copypastes as copypaste}
				<Copypaste {copypaste} />
			{/each}

			{#if copypastes.length === 0}
				<h2
					class="text-transparent text-balance bg-gradient-to-r from-violet-800 dark:from-blue-200 via-violet-400 dark:via-purple-300 to-purple-900 dark:to-purple-600 bg-clip-text text-xl md:text-2xl mx-4 font-bold max-w-xl text-center mt-12"
				>
					You have no copypastes yet, press the add button to create one.
				</h2>
			{/if}
		{/if}
	{/key}

	{#if data.error}
		<h2 class="text-red-400 text-3xl font-bold max-w-xl text-center mt-14">{data.error}</h2>
	{/if}
</div>
