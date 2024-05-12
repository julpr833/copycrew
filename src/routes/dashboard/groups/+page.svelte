<!-- groups -->
<script lang="ts">
	import Create from './components/Create.svelte';

	// groups the user is a member off.
	export let data;
	let groups:
		| {
				id: number;
				name: string;
		  }[]
		| undefined = [];
	$: groups = data.groups;
</script>

<svelte:head>
	<title>Copycrew - Groups</title>
</svelte:head>

<section id="groups" class="text-black dark:text-white flex flex-col items-center w-full">
	<div class="flex flex-col md:flex-row gap-8 mt-12 mx-8 max-w-3xl">
		<Create />
		<a href="/dashboard/groups/join" class="h-fit">
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
							<path d="M9 15l6 -6" />
							<path d="M11 6l.463 -.536a5 5 0 0 1 7.072 0a4.993 4.993 0 0 1 -.001 7.072" />
							<path
								d="M12.603 18.534a5.07 5.07 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"
							/>
							<path d="M16 19h6" />
							<path d="M19 16v6" />
						</svg></span
					>Join group
				</h2>
				<p class="pt-3">
					Enter the code for an already created group and ask the group members to join.
				</p>
			</div>
		</a>
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
				{#each groups as group}
					<a href="/dashboard/groups/{group.id}" class="h-fit">
						{group.name}
					</a>
				{/each}
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
