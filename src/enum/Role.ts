enum Role {
	Root = 'root',
	Admin = 'admin',
	User = 'user',
}

export const RoleTitles: Record<Role, string> = {
	[Role.Root]: 'Рут',
	[Role.Admin]: 'Администратор',
	[Role.User]: 'Менеджер',
};

export interface RoleItem {
	value: Role;
	label: string;
}

export const RoleList: RoleItem[] = [
	{ value: Role.Root, label: RoleTitles[Role.Root] },
	{ value: Role.Admin, label: RoleTitles[Role.Admin] },
	{ value: Role.User, label: RoleTitles[Role.User] },
];

export const RoleListByRole: Record<Role, RoleItem[]> = {
	[Role.Root]: RoleList.slice(1),
	[Role.Admin]: RoleList.slice(2),
	[Role.User]: [],
};

export default Role;
