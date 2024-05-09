import { writable, type Writable } from 'svelte/store';

export const copypastesStore: Writable<
	{
		id: number;
		title: string;
		categories: string[];
		content: string;
		author_id: number;
		group_id: number | null;
	}[]
> = writable([]);
