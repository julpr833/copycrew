import db from '$lib/database.js';
import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	const userId = locals.user.id;
	try {
		const groups = await db.groupMember.findMany({
			where: {
				user_id: userId
			},
			include: {
				gid: true // This is the group, I don't know why i named it gid I'm straight up stupid.
			}
		});

		return { groups: [...groups.map((g) => g.gid)] }; // I will fix this soonTM :D
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
					name: name,
					admin_id: userId
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
	},

	deleteGroup: async ({ request, locals }) => {
		const userId = locals.user.id;
		const data = await request.formData();
		const groupId = data.get('group_id');

		if (!groupId) {
			return error(400, { message: 'Group ID is required' });
		}

		let group = null;

		try {
			group = await db.group.findUnique({
				where: {
					id: +groupId
				}
			});
		} catch {
			return error(400, { message: 'Invalid group ID' });
		}

		if (!group) return error(400, { message: 'Group not found' });

		if (userId !== group?.admin_id)
			return error(403, { message: 'You do not have permission to delete this group' });

		try {
			await db.group.delete({
				where: { id: +groupId }
			});
		} catch {
			return error(500, { message: 'Failed to delete group' });
		}
	}
};
