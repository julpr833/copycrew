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
</script>

<section id="copypastes" class="h-[100vh]">
	<div class="flex flex-wrap items-center justify-center">
		<div
			class="flex text-black dark:text-white bg-slate-900 flex-col p-3 m-4 rounded-lg cursor-pointer transition-transform hover:scale-95 duration-300"
		>
			<h2 class="font-bold text-purple-300 mb-2 text-center">Odio a la gente gorda</h2>
			<button class="max-w-[21rem] text-sm" on:click={copyText}>
				No puedo describir cuánto odio a las personas gordas. Dondequiera que voy, lo único que veo
				son gordas obesas, es raro que alguna vez vea a alguien delgado. Es repulsivo, no sólo
				verlas, sino también su olor. Mira, estas personas qweqweon las personas con más derechos
				del planeta. Quieren que el mundo gire a su alrededor, y probablemente lo hará una vez que
				su peso alcance un punto en el que creen su propia órbita
			</button>
			<p class="mt-2 text-purple-200">odio, gordas, cancelable</p>
		</div>
	</div>
	<ToastContainer placement="bottom-right" let:data>
		<FlatToast {data} />
	</ToastContainer>
</section>
