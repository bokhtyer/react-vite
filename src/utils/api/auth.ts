import ApiUrl from "../../api/ApiUrl";
import AxiosServices from "../../api/AxiosServices";

// Types
interface LoginCredentials {
    email: string;
    password: string;
}
interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export const loginUser = async (credentials: LoginCredentials) => {
    return AxiosServices.post(ApiUrl.LOGIN_API, credentials);
};

export const registerUser = async (data: RegisterData) => {
    return AxiosServices.post(ApiUrl.REGISTER_API, data);
};

export const forgotPassword = async (email: string) => {
    return AxiosServices.post(ApiUrl.FORGOT_PASSWORD_API, { email });
};
