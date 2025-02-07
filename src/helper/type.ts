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
