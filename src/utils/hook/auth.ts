import { useMutation } from "react-query";
import { forgotPassword, loginUser, registerUser } from "../api/auth";

// Custom hook using useMutation for partner login
export function useLogin() {
    return useMutation({
        mutationKey: ["loginUser"],
        mutationFn: loginUser, // Login function defined in src/utils/api/partner/auth.ts
    });
}
// Custom hook using useMutation for Registration
export function useRegister() {
    return useMutation({
        mutationKey: ["registerUser"],
        mutationFn: registerUser, // VerifyOTP function defined in src/utils/api/partner/auth.ts
    });
}
// forgot password
export function useForgotPassword() {
    return useMutation({
        mutationKey: ["forgotPassword"],
        mutationFn: forgotPassword, // VerifyOTP function defined in src/utils/api/partner/auth.ts
    });
}
