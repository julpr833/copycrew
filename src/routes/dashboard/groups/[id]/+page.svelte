<script lang="ts">
	import Add from './components/Add.svelte';
	import CopyList from './components/CopyList.svelte';

	export let data;

	$: group = data.group;
	$: copypastes = data.copypastes;
</script>

<div class="flex w-full justify-center mt-8">
	<h1
		class="font-medium text-transparent text-2xl bg-clip-text bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900"
	>
		{group.name}
	</h1>
</div>

<Add {group} />
<CopyList {copypastes} admin_id={group.admin_id} />
