import db from '$lib/database';

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
