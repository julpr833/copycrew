<!-- copypastes -->
<script lang="ts">
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts';

	const copyText = (event: MouseEvent) => {
		if (event.target instanceof HTMLElement) {
			try {
				navigator.clipboard.writeText(event.target.innerText);
			} catch (error) {
				return toasts.error(
					"Failed to copy text, check for this page's permissions to your clipboard"
				);
			}
		}
		toasts.success('Copypaste copied succesfully');
	};

	export let data;
	const { copypastes } = data;
</script>

<svelte:head>
	<title>Copycrew - Your copypastes</title>
</svelte:head>

<section id="copypastes">
	<div class="flex items-center justify-center mt-8">
		{#if !data.error}
			<button class="rounded-xl">
				<svg
					width="44"
					height="44"
					viewBox="0 0 24 24"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="fill-purple-500 hover:fill-purple-400 hover:scale-110 transition-[color, scale] duration-200"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path
						d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm0 6a1 1 0 0 0 -1 1v2h-2l-.117 .007a1 1 0 0 0 .117 1.993h2v2l.007 .117a1 1 0 0 0 1.993 -.117v-2h2l.117 -.007a1 1 0 0 0 -.117 -1.993h-2v-2l-.007 -.117a1 1 0 0 0 -.993 -.883z"
						stroke-width="0"
					/>
				</svg>
			</button>{/if}
	</div>
	<div class="flex flex-wrap items-center justify-center">
		{#if !data.error && copypastes}
			{#each copypastes as copypaste}
				<div
					class="flex text-black dark:text-white bg-slate-900 flex-col p-3 m-4 rounded-lg cursor-pointer transition-transform hover:scale-95 duration-300 mt-12"
				>
					<h2 class="font-bold text-purple-300 mb-2 text-center">{copypaste.title}</h2>
					<button class="max-w-[21rem] text-sm break-words" on:click={copyText}>
						{copypaste.content}
					</button>
					<p class="mt-2 text-purple-200">{copypaste.categories}</p>
				</div>
			{/each}
			{#if copypastes.length === 0}
				<h2
					class=" text-transparent bg-gradient-to-r from-blue-200 via-purple-300 to-purple-600 bg-clip-text text-3xl font-bold max-w-xl text-center mt-12"
				>
					You have no copypastas yet, press the add button to create one.
				</h2>
			{/if}
		{/if}
		{#if data.error}
			<h2 class="text-red-400 text-3xl font-bold max-w-xl text-center mt-14">{data.error}</h2>
		{/if}
	</div>
	<ToastContainer placement="bottom-right" let:data>
		<FlatToast {data} />
	</ToastContainer>
</section>
