<script lang="ts">
	import { toasts } from 'svelte-toasts';
	import Delete from './Delete.svelte';
	import Edit from './Edit.svelte';

	export let copypaste: {
		id: number;
		title: string;
		categories: string[];
		content: string;
		author_id: number;
		group_id: number | null;
	};

	let copypasteElement: HTMLDivElement | null = null;

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
</script>

<div
	bind:this={copypasteElement}
	class="flex text-black dark:text-white bg-slate-900 flex-col p-3 m-4 rounded-lg mt-12 max-w-[21rem] min-w-48 transition-[box-shadow] duration-100"
>
	<div
		class="flex items-center text-center w-full border-b-[1.5px] border-gray-700 dark:border-gray-500 mb-1 gap-2"
	>
		<h2 class="font-bold text-purple-300 my-1.5 mx-1 w-full break-words text-balance">
			{copypaste.title}
		</h2>
		<div class="flex">
			<Delete id={copypaste.id} />
			<Edit {copypaste} />
		</div>
	</div>

	<button
		class=" text-sm break-words focus:outline-none text-balance"
		on:click={copyText}
		on:mouseover={() => {
			if (copypasteElement instanceof HTMLDivElement) {
				copypasteElement.classList.add('hovered-copypaste');
			}
		}}
		on:mouseleave={() => {
			if (copypasteElement instanceof HTMLDivElement) {
				copypasteElement.classList.remove('hovered-copypaste');
			}
		}}
		on:focus={() => {
			if (copypasteElement instanceof HTMLDivElement) {
				copypasteElement.classList.add('hovered-copypaste');
			}
		}}
		on:blur={() => {
			if (copypasteElement instanceof HTMLDivElement) {
				copypasteElement.classList.remove('hovered-copypaste');
			}
		}}
	>
		{copypaste.content}
	</button>
	<p class="mt-2 text-purple-200">
		{copypaste.categories.map((c) => ' ' + c)}
	</p>
</div>

<style>
	:global(.hovered-copypaste) {
		box-shadow: 0px 0px 12px 8px #816a8f;
	}
</style>
