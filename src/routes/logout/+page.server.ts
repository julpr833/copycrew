import { redirect } from '@sveltejs/kit';

export const load = (event) => {
	event.cookies.delete('ACCESS_TOKEN', { path: '/' });
	throw redirect(303, '/');
};
