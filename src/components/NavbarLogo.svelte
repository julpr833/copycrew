<div class="flex flex-row items-center">
	<svg
		width="44"
		height="44"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		class="logo-svg"
		fill="url(#gradient)"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<defs>
			<linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
				<stop offset="0%" stop-color="#fff" />
				<stop offset="100%" stop-color="#b781eb" />
			</linearGradient>
		</defs>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h3m9 -9v-5a2 2 0 0 0 -2 -2h-2" />
		<path
			d="M13 17v-1a1 1 0 0 1 1 -1h1m3 0h1a1 1 0 0 1 1 1v1m0 3v1a1 1 0 0 1 -1 1h-1m-3 0h-1a1 1 0 0 1 -1 -1v-1"
		/>
		<path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
	</svg>
	<a href="/" class="text-3xl logo-font">CopyCrew</a>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
	.logo-font {
		font-family: 'Montserrat', sans-serif;
		font-weight: 700;
	}

	.logo-svg {
		stroke: black;
	}

	@media (prefers-color-scheme: dark) {
		.logo-font {
			background: linear-gradient(to right, #fff, #b781eb);
			background-clip: text;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
		.logo-svg {
			stroke: #9200af;
		}
	}
</style>
