<!-- groups -->

<svelte:head>
	<title>Copycrew - Groups</title>
</svelte:head>

<section id="groups" class="text-black dark:text-white flex justify-center w-full">
	<div class="flex flex-col gap-8 mt-12 mx-8">
		<a href="/dashboard/groups/create" class="h-fit">
			<div
				class="flex flex-col text-center bg-slate-300 dark:bg-slate-900 p-7 max-w-xl rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
			>
				<h2 class="text-purple-600 dark:text-purple-300 text-2xl font-bold">Create group</h2>
				<p class="pt-3">
					Make a group and share copypastes between you and the members of the group.
				</p>
			</div>
		</a>
		<a href="/dashboard/groups/join" class="h-fit">
			<div
				class="flex flex-col text-center bg-slate-300 dark:bg-slate-900 p-7 max-w-xl rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
			>
				<h2 class="text-purple-600 dark:text-purple-300 text-2xl font-bold">
					Join an existing group
				</h2>
				<p class="pt-3">
					Enter the code for an already created group and ask the group members to join.
				</p>
			</div>
		</a>
	</div>
</section>
