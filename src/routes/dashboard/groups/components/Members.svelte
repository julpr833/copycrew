<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import Kick from './Kick.svelte';

	export let group;

	type MemberList = {
		showList: boolean;
		toggleList: () => void;

		memberCount: number;
	};

	const memberList: MemberList = {
		showList: true,
		toggleList: () => (memberList.showList = !memberList.showList),

		memberCount: group.members.length
	};
</script>

<button on:click={memberList.toggleList}>
	<svg
		class="stroke-white fill-white hover:stroke-lime-400 hover:fill-lime-400 transition-[fill, stroke] duration-200"
		width="30"
		height="30"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
		<path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
		<path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
		<path d="M17 10h2a2 2 0 0 1 2 2v1" />
		<path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
		<path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
	</svg>
</button>

{#if memberList.showList}
	<div
		transition:fade={{ duration: 180 }}
		role="dialog"
		class="fixed z-10 bg-slate-900/50 h-full w-full top-0 left-0 flex flex-col items-center justify-center"
	>
		<div class="min-w-80 max-w-md">
			<div class="bg-slate-900 px-4 py-5 rounded-t-lg">
				<h3 class="text-purple-200 tracking-wide text-2xl text-center font-semibold">
					{group.name}
				</h3>
			</div>
			<div>
				{#each group.members as member}
					<div
						class="bg-slate-800 px-6 py-3 flex justify-between gap-1 items-center font-sans text-white border-b border-b-slate-600/30"
					>
						<p>{member.id.username}</p>
						{#if $page.data.user.id === group.admin_id && member.user_id !== group.admin_id}
							<div class="flex items-center gap-1.5">
								<button
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
								<Kick {member} />
							</div>
						{/if}
					</div>
				{/each}
			</div>
			<div class="flex justify-center bg-slate-900 px-2 py-1.5 rounded-b-lg">
				<button
					on:click={() => (memberList.showList = false)}
					class="bg-slate-700 hover:bg-red-800 transition-[background-color] duration-200 text-white font-bold py-1 px-2.5 rounded"
				>
					Close
				</button>
			</div>
		</div>
	</div>
{/if}
