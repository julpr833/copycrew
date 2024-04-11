import db from '$lib/database';
import bcrypt from 'bcryptjs';
import { JWT_KEY } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();
		const rememberMe = data.get('remember')?.toString() === 'on' || false;

		if (!email || !password) {
			return {
				error: !email
					? `Please fill the email field correctly.`
					: !password
						? `Please fill the password field correctly.`
						: ''
			};
		}

		const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (!emailRegex.test(email)) {
			return {
				error: 'Please enter a valid email address'
			};
		}

		const user = await db.user.findUnique({
			where: {
				email
			}
		});

		if (!user) {
			return {
				error: 'This e-mail is not associated with any account.'
			};
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return {
				error: 'The password you entered is incorrect.'
			};
		}

		const token = jwt.sign({ userId: user.id, username: user.username }, JWT_KEY, {
			expiresIn: rememberMe ? '30d' : '1h'
		});

		cookies.set('ACCESS_TOKEN', token, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: rememberMe ? 30 * 24 * 60 * 60 : 60 * 60,
			path: '/'
		});

		throw redirect(303, '/dashboard');
	}
};

export const load = ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/');
	}
};
