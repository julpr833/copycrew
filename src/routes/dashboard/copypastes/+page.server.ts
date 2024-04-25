import db from '$lib/database';
import { error, json } from '@sveltejs/kit';

export async function load({ locals }) {
	const userId = locals.user.id;
	try {
		const copypastes = await db.copypaste.findMany({
			where: {
				author_id: userId,
				group_id: null
			},
			orderBy: {
				id: 'desc'
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
	add: async ({ request, locals }) => {
		const data = await request.json();

		if (!data.title || !data.content) {
			return error(400, { message: `${!data.title ? 'Title' : 'Content'} is required` });
		}

		if (data.categories == '') {
			return error(400, { message: 'At least one category is required' });
		}

		try {
			// const newPaste = await db.copypaste.create({
			// 	data: {
			// 		title: data.title,
			// 		content: data.content,
			// 		author_id: locals.user.id,
			// 		categories: data.categories
			// 	}
			// });
			return json({ test: 'esto es una prueba' });
		} catch {
			return error(500, {
				message: 'Something went wrong while adding your copypaste'
			});
		}
	}
};
