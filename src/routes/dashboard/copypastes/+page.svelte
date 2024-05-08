<!-- copypastes -->
<script lang="ts">
	import { ToastContainer, FlatToast } from 'svelte-toasts';

	// Components
	import Copypastes from './components/Copypastes.svelte';
	import Add from './components/Add.svelte';

	// Props
	export let data;
</script>

<svelte:head>
	<title>Copycrew - Your copypastes</title>
</svelte:head>

<Add />
<Copypastes {data} />

<ToastContainer placement="bottom-right" let:data>
	<FlatToast {data} />
</ToastContainer>
