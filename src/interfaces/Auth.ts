import type Role from "../enum/Role";

export interface AuthOut {
	id: string | null;
	name: string | null;
	role: Role | null;
	isAdmin: boolean;
}
export interface AuthIn {
	username: string,
	password: string
}