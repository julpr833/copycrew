import db from '$lib/database';
import { type Actions } from '@sveltejs/kit';

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
	add: async ({ request }) => {
		const data = await request.formData();
		const title = data.get('title');
		const content = data.get('content');

		return {
			title,
			content
		};
	}
} satisfies Actions;

// export const actions = {
// 	add: async ({ request, locals }) => {
// 		const data = await request.formData();
// 		const title = data.get('title');
// 		const content = data.get('content');
// 		const categories = JSON.parse(data.get('categories') as string);

// 		if (!title || !content) {
// 			return error(400, { message: `${!title ? 'Title' : 'Content'} is required` });
// 		}

// 		if ((title as string).length < 4) {
// 			return error(400, { message: 'Title must be at least 4 characters long' });
// 		}

// 		if (categories == '') {
// 			return error(400, { message: 'At least one category is required' });
// 		}

// 		try {
// 			const newPaste = await db.copypaste.create({
// 				data: {
// 					title: title.toString(),
// 					content: content.toString(),
// 					author_id: locals.user.id,
// 					categories: categories
// 				}
// 			});

// 			return {
// 				id: newPaste.id,
// 				title: newPaste.title,
// 				content: newPaste.content,
// 				categories: newPaste.categories
// 			};
// 		} catch {
// 			return error(500, {
// 				message: 'Something went wrong while adding your copypaste'
// 			});
// 		}
// 	},

// 	delete: async ({ request, locals }) => {
// 		const data = await request.formData();
// 		const id = data.get('id');

// 		const paste = await db.copypaste.findUnique({
// 			where: {
// 				id: Number(id)
// 			}
// 		});
// 		if (!paste) {
// 			return error(404, {
// 				message: 'Copypaste not found'
// 			});
// 		}

// 		if (paste.author_id !== locals.user.id) {
// 			return error(403, {
// 				message: 'You do not have permission to delete this copypaste'
// 			});
// 		}

// 		try {
// 			await db.copypaste.delete({
// 				where: {
// 					id: Number(id)
// 				}
// 			});
// 		} catch {
// 			return error(500, {
// 				message: 'Something went wrong while deleting your copypaste'
// 			});
// 		}
// 	}
// } satisfies Actions;
