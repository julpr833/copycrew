import jwt from 'jsonwebtoken';
import { JWT_KEY } from '$env/static/private';
import db from '$lib/database';
import type { Handle } from '@sveltejs/kit';
import type { JwtPayload } from 'jsonwebtoken';

interface CustomPayload extends JwtPayload {
	id: number;
}

export const auth: Handle = async ({ event, resolve }) => {
	const authCookie = event.cookies.get('ACCESS_TOKEN');

	if (authCookie) {
		try {
			const jwtUser = jwt.verify(authCookie, JWT_KEY) as CustomPayload;
			const user = await db.user.findUnique({
				where: {
					id: jwtUser.userId
				},
				select: {
					id: true,
					email: true
				}
			});
			if (user) {
				event.locals.user = user;
			}
		} catch (error) {
			console.log(error);
		}
	}

	return await resolve(event);
};

export const handle = auth;
