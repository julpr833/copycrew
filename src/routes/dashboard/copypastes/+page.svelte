<!-- copypastes -->
<script lang="ts">
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts';
	import { fade } from 'svelte/transition';

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

	let showAddCopypaste = false;
</script>

<svelte:head>
	<title>Copycrew - Your copypastes</title>
</svelte:head>

<section id="copypastes">
	<div class="flex items-center justify-center mt-8">
		{#if !data.error}
			<div class="relative">
				<button class="rounded-xl" on:click={() => (showAddCopypaste = !showAddCopypaste)}>
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
				</button>
				{#if showAddCopypaste}
					<form
						transition:fade={{ duration: 150 }}
						action=""
						class="bg-purple-900/20 backdrop-blur-lg absolute left-1/2 transform -translate-x-1/2 z-10 rounded-lg p-4 flex flex-col gap-3 text-white"
					>
						<div class="flex flex-col">
							<label for="add-copypaste-title" class="text-xs mb-1">Title</label>
							<input
								type="text"
								name="title"
								id="add-copypaste-title"
								class="bg-transparent border rounded-md w-1/2 text-xs px-3 py-1"
							/>
						</div>
						<div class="flex flex-col">
							<label for="add-copypaste-content" class="text-xs mb-1">Content</label>
							<textarea
								name="content"
								id="add-copypaste-content"
								class="bg-transparent border rounded-md text-xs px-2 py-1"
								cols="32"
								rows="8"
							></textarea>
						</div>
						<div class="flex flex-col">
							<label for="add-copypaste-categories" class="text-xs mb-1">Categories</label>
							<div class="flex gap-1.5">
								<input
									type="text"
									name="categories"
									id="add-copypaste-categories"
									class="bg-transparent border rounded-md w-1/3 text-xs"
								/>
								<button
									class="bg-purple-700 hover:bg-purple-500 transition-colors duration-200 rounded-full p-1.5"
									><svg
										width="12"
										height="12"
										viewBox="0 0 24 24"
										stroke-width="4"
										class="stroke-black dark:stroke-white"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path stroke="none" d="M0 0h24v24H0z" fill="none" />
										<path d="M12 5l0 14" />
										<path d="M5 12l14 0" />
									</svg></button
								>
							</div>
						</div>
						<div>
							<button
								type="submit"
								class="text-sm mt-1 bg-purple-800 hover:bg-purple-500 transition-colors duration-200 w-fit px-4 py-1 rounded-md"
								>Add</button
							>
							<div class="flex gap-1 mb-1 mt-2.5 flex-wrap">
								<div class="text-xs bg-gray-800 p-1.5 rounded-lg flex gap-1.5">
									<button class="rounded-full bg-gray-900 py-0.5 px-1"
										><svg
											class="stroke-white"
											width="8"
											height="8"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<path stroke="none" d="M0 0h24v24H0z" fill="none" />
											<path d="M18 6l-12 12" />
											<path d="M6 6l12 12" />
										</svg></button
									>
									<p class="">Example</p>
								</div>
								<div class="text-xs bg-gray-800 p-1.5 rounded-lg flex gap-1.5">
									<button class="rounded-full bg-gray-900 py-0.5 px-1"
										><svg
											class="stroke-white"
											width="8"
											height="8"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<path stroke="none" d="M0 0h24v24H0z" fill="none" />
											<path d="M18 6l-12 12" />
											<path d="M6 6l12 12" />
										</svg></button
									>
									<p class="">Example</p>
								</div>
							</div>
						</div>
					</form>
				{/if}
			</div>
		{/if}
	</div>
	<div class="flex flex-wrap items-center justify-center">
		{#if !data.error && copypastes}
			{#each copypastes as copypaste}
				<div
					class="flex text-black dark:text-white bg-slate-900 flex-col p-3 m-4 rounded-lg cursor-pointer mt-12 _box-shadow-hover"
				>
					<div
						class="flex items-center text-center w-full border-b-[1.5px] border-gray-700 dark:border-gray-500 mb-1"
					>
						<h2 class="font-bold text-purple-300 py-1 w-full">
							{copypaste.title}
						</h2>
						<button>
							<svg
								class="transition-colors hover:text-red-500 duration-200"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path
									d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z"
									stroke-width="0"
									fill="currentColor"
								/>
								<path
									d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z"
									stroke-width="0"
									fill="currentColor"
								/>
							</svg>
						</button>
						<button class="transition-[stroke] stroke-white hover:stroke-blue-500 duration-200">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
								<path d="M13.5 6.5l4 4" />
							</svg>
						</button>
					</div>

					<button class="max-w-[21rem] text-sm break-words" on:click={copyText}>
						{copypaste.content}
					</button>
					<p class="mt-2 text-purple-200">
						{copypaste.categories.map((str) => ' ' + str)}
					</p>
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

<style>
	._box-shadow-hover {
		transition: box-shadow;
		transition-duration: 300ms;
	}

	._box-shadow-hover:hover {
		box-shadow: 0px 0px 12px 8px #816a8f;
	}
</style>
