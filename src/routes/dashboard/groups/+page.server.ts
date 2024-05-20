import db from '$lib/database.js';
import { error } from '@sveltejs/kit';

// For generating invite codes
import { nanoid } from 'nanoid';

export async function load({ locals }) {
	const userId = locals.user.id;
	try {
		const groups = await db.group.findMany({
			where: {
				members: {
					some: {
						user_id: userId
					}
				}
			},
			include: {
				members: {
					include: {
						id: {
							select: {
								username: true
							}
						}
					}
				}
			},
			orderBy: {
				id: 'desc'
			}
		});
		return { groups };
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
					admin_id: userId,
					inviteCode: nanoid(8)
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

	renameGroup: async ({ request, locals }) => {
		const userId = locals.user.id;
		const data = await request.formData();

		let { group_id: groupId, name } = Object.fromEntries(data);
		name = name.toString();

		if (!name) {
			return error(400, { message: 'Name is required' });
		}

		if (name.length < 4 || name.length > 32) {
			return error(400, { message: 'Name must be between 4 and 32 characters long' });
		}

		try {
			await db.group.update({
				where: {
					id: +groupId
				},
				data: {
					name
				}
			});
		} catch {
			return error(500, { message: 'Failed to rename group' });
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
	},

	join: async ({ request, locals }) => {
		const userId = locals.user.id;
		const data = await request.formData();
		const inviteCode = data.get('inviteCode')?.toString();

		if (!inviteCode) {
			return error(400, { message: 'Invite code is required' });
		}

		let group = null;

		try {
			group = await db.group.findUnique({
				where: {
					inviteCode
				}
			});
		} catch {
			return error(500, { message: 'Invalid invite code' });
		}

		if (!group) {
			return error(400, { message: 'Invalid invite code' });
		}

		try {
			await db.groupMember.create({
				data: {
					user_id: userId,
					group_id: group.id
				}
			});
		} catch {
			return error(500, { message: 'Failed to join group' });
		}

		try {
			await db.group.update({
				where: {
					id: group.id
				},
				data: {
					inviteCode: nanoid(8)
				}
			});
		} catch {
			return error(500, { message: 'Internal error, contact support' });
		}
	},

	leave: async ({ request, locals }) => {
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

		if (userId === group?.admin_id)
			return error(400, { message: 'You cannot leave your own group' });

		try {
			await db.groupMember.delete({
				where: {
					user_id_group_id: {
						user_id: userId,
						group_id: +groupId
					}
				}
			});
		} catch {
			return error(500, { message: 'Failed to leave group' });
		}
	}
};
