<!-- index -->
<script>
	export let data;
</script>

<svelte:head>
	<title>Copycrew</title>
</svelte:head>

<section id="hero" class="flex justify-center items-center md:h-[85dvh] my-8">
	<div class="flex flex-col-reverse lg:flex-row items-center gap-8 mx-8">
		<div class="text-black dark:text-white max-w-xl mx-4 md:mx-0">
			<h2 class="text-2xl md:text-4xl font-bold">
				Save your <span class="text-[#583d7c] dark:text-[#cdaff5]">copypastes</span>, build your
				arsenal, and spread chaos on Twitch chats
			</h2>
			<p class="mt-3">
				<span class="text-[#583d7c] dark:text-[#cdaff5]">CopyCrew</span> will be your handbook for
				saving your <span class="text-[#583d7c] dark:text-[#cdaff5]">copypastes</span> and
				organizing them, while also being able to share them with your friends and spread
				<span class="text-[#7c3d3d] dark:text-[#f5afaf]">mayhem</span> around the internet
			</p>
			<div class="flex justify-center">
				<a
					href={!data.user ? '/signup' : '/dashboard'}
					class="flex stroke-black dark:stroke-white p-3 mt-4 border border-black dark:border-white rounded-md w-fit hover:stroke-white hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-colors duration-300"
					>{!data.user ? 'Join now' : 'Go to dashboard'}
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
						<path d="M9 6l6 6l-6 6" />
					</svg></a
				>
			</div>
		</div>
		<img src="chatting.webp" alt="Chatting" width="256" height="256" />
	</div>
</section>
