<script>
	import Copypaste from './Copypaste.svelte';

	export let copypastes;
	export let admin_id;
</script>

<div class="flex flex-wrap justify-center items-center gap-4 m-8">
	<!-- each -->
	{#if copypastes.length !== 0}
		{#each copypastes as copypaste}
			<Copypaste {copypaste} {admin_id} />
		{/each}
	{:else}
		<h2
			class="text-transparent bg-gradient-to-r from-blue-500 via-purple-700 to-purple-800 bg-clip-text text-xl md:text-2xl font-bold max-w-xl text-center mx-4"
		>
			This group does not have any copypastes yet, press the add button to create one.
		</h2>
	{/if}
</div>
