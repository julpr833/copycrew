export interface UserCookieData {
	id?: number;
	email?: string;
}

export interface User {
	id: number;
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
	author_id: number;
	group?: Group;
	group_id?: number;
}

export interface Group {
	id: number;
	name: string;
	members: User[];
	copypastes: Copypaste[];
}
