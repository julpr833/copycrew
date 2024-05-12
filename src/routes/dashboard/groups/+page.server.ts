import db from '$lib/database.js';
import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	const userId = locals.user.id;
	try {
		const groupMember = await db.groupMember.findMany({
			where: {
				user_id: userId
			}
		});

		const groups = await db.group.findMany({
			where: {
				id: {
					in: groupMember.map((member) => member.group_id)
				}
			}
		});
		return { groups: [...groups] };
	} catch (error) {
		return {
			error: 'There was an error while trying to fetch your groups.'
		};
	}
}

export const actions = {
	create: async ({ request, locals }) => {
		const userId = locals.user.id;
		const data = await request.formData();
		const name = data.get('name')?.toString();

		if (!name) {
			return error(400, { message: 'Name is required' });
		}

		if (name.length < 4 || name.length > 32) {
			return error(400, { message: 'Name must be between 4 and 32 characters long' });
		}

		try {
			const newGroup = await db.group.create({
				data: {
					name: name
				}
			});

			try {
				await db.groupMember.create({
					data: {
						user_id: userId,
						group_id: newGroup.id
					}
				});
			} catch (error) {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	}
};
