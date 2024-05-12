<!-- copypastes -->
<script lang="ts">
	// Components
	import CopypasteList from './components/CopypasteList.svelte';
	import Add from './components/Add.svelte';

	// Props
	export let data;
</script>

<svelte:head>
	<title>Copycrew - Your copypastes</title>
</svelte:head>

<Add />
<CopypasteList {data} />
