<!-- groups -->
<script lang="ts">
	import CopyInvite from './components/CopyInvite.svelte';
	import Create from './components/Create.svelte';
	import Delete from './components/Delete.svelte';
	import Edit from './components/Edit.svelte';
	import Join from './components/Join.svelte';

	// groups the user is a member off.
	export let data;

	let groups: { id: number; name: string; admin_id: number; inviteCode: string }[] | undefined = [];
	$: groups = data?.groups;
</script>

<svelte:head>
	<title>Copycrew - Groups</title>
</svelte:head>

<section id="groups" class="text-black dark:text-white flex flex-col items-center w-full">
	<div class="flex flex-col md:flex-row gap-8 mt-12 mx-8 max-w-3xl">
		<Create />
		<Join />
	</div>
	<hr class="border-t-[1.5px] border-gray-700 dark:border-gray-500 w-1/2 max-w-2xl mt-8 mb-4" />
	{#if !data.error}
		{#if groups}
			{#if groups.length < 1}
				<h1
					class="text-transparent text-center font-bold text-lg md:text-2xl bg-gradient-to-r from-blue-200 via-purple-300 to-purple-500 bg-clip-text mx-3"
				>
					You are not a member of any groups yet, create or join one!
				</h1>
			{:else}
				<div class="flex flex-wrap max-w-4xl gap-4">
					{#each groups as group}
						<div
							class="flex items-center gap-2 py-2 px-2.5 bg-slate-900 rounded-xl text-purple-400 font-bold"
						>
							<a
								data-sveltekit-preload-data="tap"
								class="hover:text-purple-300 transition-[color] duration-200"
								href="/dashboard/groups/{group.id}">{group.name}</a
							>
							{#if data.user.id === group.admin_id}
								<CopyInvite inviteCode={group.inviteCode} />
								<Delete id={group.id} />
								<Edit name={group.name} id={group.id} />
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		{/if}
	{:else}
		<h1
			class="text-transparent text-center font-bold text-lg md:text-2xl bg-gradient-to-r from-pink-200 via-red-300 to-red-500 bg-clip-text mx-3"
		>
			{data.error}
		</h1>
	{/if}
</section>
