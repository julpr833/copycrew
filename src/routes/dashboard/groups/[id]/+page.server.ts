import db from '$lib/database.js';
import { redirect } from '@sveltejs/kit';

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
				}
			}
		}
	});

	if (!group || !group.members.some((m) => m.user_id === userId))
		throw redirect(303, '/dashboard/groups');

	return {
		group: group.name,
		copypastes: group.copypastes
	};
}
