import db from '$lib/database';
import { fail } from '@sveltejs/kit';

export async function load({ locals }) {
	const userId = locals.user.id;
	try {
		const copypastes = await db.copypaste.findMany({
			where: {
				author_id: userId,
				group_id: null
			}
		});
		return { copypastes: [...copypastes] };
	} catch (error) {
		return {
			error: 'There was an error while trying to fetch your copypastas.'
		};
	}
}

export const actions = {
	add: async ({ request }) => {
		const data = await request.formData();
		const title = data.get('title')?.toString();
		const content = data.get('content')?.toString();
		const categories = data.get('categories');

		if (!title || !content) {
			return fail(400, { title, content, error: `${!title ? 'Title' : 'Content'} is required.` });
		}

		if (categories == '') {
			return fail(400, { categories, error: 'At least one category is required.' });
		}
	}
};
