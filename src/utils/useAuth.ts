import { useAppSelector } from "../store";
import { selectCurrentUser, selectIsAuthenticated, selectAuthToken, selectUserPermissions } from "../store/authSlice";

export const useAuth = () => {
    const user = useAppSelector(selectCurrentUser);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const token = useAppSelector(selectAuthToken);
    const permissions = useAppSelector(selectUserPermissions);

    return {
        user,
        isAuthenticated,
        token,
        permissions,
    };
};
