export type MenuItem = {
    id: string;
    title: string;
    path?: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
};
export type LoginFormType = {
    email: string;
    password: string;
};

export type User = {
    id: string;
    username: string;
    email: string;
    role: string;
    permissions?: string[];
};
export type Permission = {
    id?: string;
    name: string;
    action: string;
};
export type Role = {
    id: string;
    name: string;
    permissions: Permission[];
};
