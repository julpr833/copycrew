import db from '$lib/database.js';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params, locals }) {
	const userId = locals.user.id;

	const group = await db.group.findUnique({
		where: {
			id: +params.id
		},
		include: {
			members: {
				where: {
					user_id: userId
				}
			},
			copypastes: {
				where: {
					group_id: +params.id
				},
				include: {
					author: {
						select: {
							username: true
						}
					}
				},
				orderBy: {
					id: 'desc'
				}
			}
		}
	});

	if (!group || !group.members.some((m) => m.user_id === userId))
		throw redirect(303, '/dashboard/groups');

	return {
		group: { name: group.name, id: group.id },
		copypastes: group.copypastes
	};
}

export const actions = {
	add: async ({ request, locals }) => {
		const data = await request.formData();
		const { group, title, content, categories: unparsedCategories } = Object.fromEntries(data);
		const categories = JSON.parse(unparsedCategories as string);

		if (!title || !content) {
			return error(400, { message: `${!title ? 'Title' : 'Content'} is required` });
		}

		if (title.toString().length < 4 || title.toString().length > 32) {
			return error(400, { message: 'Title must be between 4 and 32 characters long' });
		}

		if (categories.length < 1 || !categories) {
			return error(400, { message: 'At least one category is required' });
		}

		if (categories.some((category: string) => category.includes(' '))) {
			return error(400, { message: 'Categories cannot contain spaces' });
		}

		try {
			const newCopypaste = await db.copypaste.create({
				data: {
					title: title.toString(),
					content: content.toString(),
					author_id: locals.user.id,
					group_id: +group,
					categories
				}
			});
			return newCopypaste;
		} catch (error) {
			console.log(error);
		}
	},

	delete: async ({ request, locals }) => {
		const data = await request.formData();
		const id = data.get('id');
		const group_id = data.get('group_id');

		const paste = await db.copypaste.findUnique({
			where: {
				id: Number(id),
				group_id: Number(group_id)
			},
			include: {
				group: {
					select: {
						admin_id: true
					}
				}
			}
		});

		if (!paste || !paste.group) {
			return error(404, {
				message: 'Copypaste not found'
			});
		}

		if (paste.author_id !== locals.user.id && paste.group.admin_id !== locals.user.id) {
			return error(403, {
				message: 'You do not have permission to delete this copypaste'
			});
		}

		try {
			await db.copypaste.delete({
				where: {
					id: Number(id)
				}
			});
		} catch {
			return error(500, {
				message: 'Something went wrong while deleting your copypaste'
			});
		}
	},

	edit: async ({ request, locals }) => {
		const data = await request.formData();
		const {
			id,
			group_id,
			title,
			content,
			categories: unparsedCategories
		} = Object.fromEntries(data);

		const categories = JSON.parse(unparsedCategories as string);

		if (!title || !content) {
			return error(400, { message: `${!title ? 'Title' : 'Content'} is required` });
		}

		if (title.toString().length < 4 || title.toString().length > 32) {
			return error(400, { message: 'Title must be between 4 and 32 characters long' });
		}

		if (categories.length < 1 || !categories) {
			return error(400, { message: 'At least one category is required' });
		}

		if (categories.some((category: string) => category.includes(' '))) {
			return error(400, { message: 'Categories cannot contain spaces' });
		}

		const paste = await db.copypaste.findUnique({
			where: {
				id: Number(id),
				group_id: Number(group_id)
			},
			include: {
				group: {
					select: {
						admin_id: true
					}
				}
			}
		});

		if (!paste || !paste.group) {
			return error(404, {
				message: 'Copypaste not found'
			});
		}

		if (paste.author_id !== locals.user.id && paste.group.admin_id !== locals.user.id) {
			return error(403, {
				message: 'You do not have permission to delete this copypaste'
			});
		}

		try {
			const editedCopypaste = await db.copypaste.update({
				where: {
					id: +id,
					group_id: +group_id
				},
				data: {
					title: title.toString(),
					content: content.toString(),
					categories: categories
				}
			});
			return editedCopypaste;
		} catch {
			return error(500, {
				message: 'Something went wrong while deleting your copypaste'
			});
		}
	}
};
