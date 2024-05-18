<script lang="ts">
	import { toasts } from 'svelte-toasts';

	export let inviteCode;

	const copyInvite = () => {
		try {
			navigator.clipboard.writeText(inviteCode);
			toasts.success('Invite code copied to clipboard');
		} catch (error) {
			toasts.error('Failed to copy invite code');
			return;
		}
	};
</script>

<button on:click={copyInvite}>
	<svg
		class="stroke-white py-0.5 -mr-2 hover:stroke-yellow-500 transition-[stroke] duration-200"
		width="30"
		height="30"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<circle cx="9" cy="7" r="4" />
		<path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
		<path d="M16 11h6m-3 -3v6" />
	</svg>
</button>
