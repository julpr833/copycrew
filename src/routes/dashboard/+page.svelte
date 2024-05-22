<!-- dashboard -->
<script>
	import { goto } from '$app/navigation';

	export let data;
</script>

<svelte:head>
	<title>Copycrew - Dashboard</title>
</svelte:head>

<section id="dashboard">
	<div class="flex flex-col w-full items-center mb-8">
		<h2 class="text-black dark:text-white font-bold text-3xl mt-12 mx-12">
			Welcome, <span class="text-purple-500">{data.user.email}</span>, what do you want to do today?
		</h2>
		<div class="grid grid-cols-1 gap-4 text-black dark:text-white mt-12 mx-12">
			<button
				on:click={() => goto('/dashboard/copypastes')}
				class="bg-slate-900 col-span-2 md:col-span-1 p-8 rounded-lg cursor-pointer transition-transform hover:scale-105 duration-300"
			>
				<div class="flex gap-1 items-center text-purple-400 stroke-purple-400">
					<svg
						width="32"
						height="32"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path
							d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"
						/>
						<path
							d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"
						/>
					</svg>
					<h3 class="text-xl font-bold font-sans">My copypastes</h3>
				</div>
				<p class="mt-4 text-left">View and edit your personal copypastes</p>
			</button>
			<button
				on:click={() => goto('/dashboard/groups')}
				class="bg-slate-900 col-span-2 md:col-span-1 p-8 rounded-lg cursor-pointer transition-transform hover:scale-105 duration-300"
			>
				<div class="flex gap-1 items-center text-purple-400 stroke-purple-400">
					<svg
						width="32"
						height="32"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						fill="none"
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
					<h3 class="text-xl font-bold font-sans">My groups</h3>
				</div>
				<p class="mt-4 text-left">View the copypastes posted in the groups you have joined</p>
			</button>
		</div>
		<hr class="border-t-[1.5px] border-gray-700 dark:border-gray-500 w-1/2 max-w-2xl mt-8 mb-4" />
		<div
			class="bg-slate-800 text-white px-8 md:px-4 md:w-full max-w-md mt-4 mx-4 rounded-lg flex flex-col items-center"
		>
			<h2 class="text-3xl mt-2">Changelog</h2>
			<hr class="border-t-[1.5px] border-gray-700 dark:border-gray-500 w-full my-2" />
			<ul class="self-baseline mx-8 mt-2 mb-4 font-mono">
				<li class="before:content-['>'] before:mr-2">admins can now ban members</li>
				<li class="before:content-['>'] before:mr-2">admins can now kick members</li>
				<li class="before:content-['>'] before:mr-2">you can now leave groups</li>
				<li class="before:content-['>'] before:mr-2">joining groups added</li>
				<li class="before:content-['>'] before:mr-2">renaming groups added</li>
				<li class="before:content-['>'] before:mr-2">you can now edit group copypastes</li>
				<li class="before:content-['>'] before:mr-2">you can now delete group copypastes</li>
				<li class="before:content-['>'] before:mr-2">you can now create group copypastes</li>
				<li class="before:content-['>'] before:mr-2">groups now have admins</li>
				<li class="before:content-['>'] before:mr-2">group page added</li>
			</ul>
		</div>
	</div>
</section>
