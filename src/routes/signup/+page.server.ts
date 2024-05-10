import bcrypt from 'bcryptjs';
import db from '$lib/database';
import { Prisma } from '@prisma/client';
import { json, redirect } from '@sveltejs/kit';

export const actions = {
	register: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username');
		const email = data.get('email');
		const emailConfirmation = data.get('email-confirmation');
		const password = data.get('password');
		const passwordConfirmation = data.get('password-confirmation');

		if (
			[username, email, emailConfirmation, password, passwordConfirmation].some(
				(v) => v === null || v === undefined
			)
		) {
			return {
				error: 'All fields are required'
			};
		}

		const isAlphanumericRegex = /^[a-zA-Z0-9]+$/;
		if (!isAlphanumericRegex.test((username as FormDataEntryValue).toString())) {
			return {
				error: 'Username must be alphanumeric'
			};
		}

		const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (!emailRegex.test((email as FormDataEntryValue).toString())) {
			return {
				error: 'Please enter a valid email address'
			};
		}

		if (emailConfirmation !== email) {
			return {
				error: 'Emails do not match'
			};
		}

		if ((password as FormDataEntryValue).toString().length < 8) {
			return {
				error: 'Password must be at least 8 characters long'
			};
		}

		if (passwordConfirmation !== password) {
			return {
				error: 'Passwords do not match'
			};
		}

		const salt = bcrypt.genSaltSync(10);
		var hash: string;
		try {
			hash = bcrypt.hashSync((password as FormDataEntryValue).toString(), salt);
		} catch (error) {
			return {
				error: 'There was an internal error while creating your account. Please try again later.'
			};
		}

		try {
			await db.user.create({
				data: {
					email: (email as FormDataEntryValue).toString(),
					username: (username as FormDataEntryValue).toString(),
					password: hash
				}
			});
		} catch (error) {
			if (error instanceof Error) {
				if (error instanceof Prisma.PrismaClientKnownRequestError && error.meta !== undefined) {
					if (error.code === 'P2002') {
						const target: string = error.meta.target as string;
						console.log(`That ${target[0]} is already in use.`);

						return { error: `That ${target[0]} is already in use.` };
					}
				}
			}

			return {
				error: 'There was an internal error while creating your account. Please try again later.'
			};
		}

		return redirect(302, '/login');
	}
};
