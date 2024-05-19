<script lang="ts">
	import { toasts } from 'svelte-toasts';
	import { page } from '$app/stores';

	import Delete from './Delete.svelte';
	import Edit from './Edit.svelte';

	// Data
	export let copypaste;
	export let admin_id;

	// Used to animate the glow to add interactivity to the copypaste.
	let copypasteElement: HTMLDivElement | null = null;

	// Copy text to clipboard.
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
	class="w-[21rem] shadow-[0px_4px_4px_rgba(0,0,0,0.8)] rounded-lg transition-[box-shadow, transform] duration-200"
	bind:this={copypasteElement}
>
	<div class="bg-slate-900 rounded-t-lg p-2">
		<div class="flex justify-between">
			<div>
				<!-- Copypaste name -->
				<h2 class="text-purple-300 font-semibold leading-[1.10rem]">{copypaste.title}</h2>
			</div>
			{#if $page.data.user.id === copypaste.author_id || $page.data.user.id === admin_id}
				<div class="flex">
					<!-- Delete and edit button -->
					<Delete id={copypaste.id} group_id={copypaste.group_id} />
					<Edit {copypaste} group_id={copypaste.group_id} />
				</div>
			{/if}
		</div>

		<p class="text-white font-medium text-xs mt-1.5">
			<!-- Author name -->
			By {copypaste.author.username}
		</p>
	</div>
	<button
		class="flex bg-slate-800 min-w-full"
		on:click={copyText}
		on:mouseover={() => copypasteElement?.classList.add('hovered-copypaste')}
		on:mouseleave={() => copypasteElement?.classList.remove('hovered-copypaste')}
		on:focus={() => copypasteElement?.classList.add('hovered-copypaste')}
		on:blur={() => copypasteElement?.classList.remove('hovered-copypaste')}
	>
		<!-- Content -->
		<p class="max-w-[21rem] text-white break-words text-balance text-sm p-2 text-left">
			{copypaste.content}
		</p>
	</button>
	<div class="bg-slate-900 rounded-b-lg">
		<!-- Categories -->
		<p class="text-purple-200 text-xs mx-2 py-1">{copypaste.categories.join(', ')}</p>
	</div>
</div>

<style>
	:global(.hovered-copypaste) {
		box-shadow: 0px 0px 4px rgba(119, 91, 134, 1);
	}
</style>
