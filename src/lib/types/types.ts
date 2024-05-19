export interface UserCookieData {
	id?: string;
	email?: string;
}

export interface User {
	id: string;
	username: string;
	email: string;
	password: string;
	groups?: Group[];
	copypastes?: Copypaste[];
}

export interface Copypaste {
	id: number;
	title: string;
	categories: string[];
	content: string;
	author: User;
	author_id: string;
	group?: Group;
	group_id?: number;
}

export interface Group {
	id: number;
	name: string;
	members: User[];
	copypastes: Copypaste[];
}
