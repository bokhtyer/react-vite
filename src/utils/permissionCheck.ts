import { useAppSelector } from "../store";

export const usePermissionCheck = () => {
    const selectUserPermissions = (state: any) => state.auth.user?.permissions || [];
    const userPermissions = useAppSelector(selectUserPermissions);

    return (requiredPermission: string | undefined) => {
        if (!requiredPermission) return true;
        return userPermissions.includes(requiredPermission);
    };
};
