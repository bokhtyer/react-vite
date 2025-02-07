import type React from "react";
import { useFormik } from "formik";
import { useLogin } from "../../utils/hook/auth";
import { emailRegex } from "../../helper/helper";
import { toast } from "react-toastify";
import InputField from "../../components/common/InputField/page";
import Button from "../../components/common/button/Button";
import siteConfig from "../../config/site-config";
import path from "../../routes/path";
import { LoginFormType } from "../../helper/type";

const Login: React.FC = () => {
    const { mutate: login, isLoading } = useLogin();

    const validateLoginForm = (values: LoginFormType) => {
        const errors: Partial<LoginFormType> = {};

        if (!emailRegex.test(values.email.trim())) errors.email = "Invalid email address";
        if (!values.email.trim()) errors.email = "Email is required";
        if (values.password && values.password.length < 8) errors.password = "Password must be at least 8 characters";
        if (!values.password) errors.password = "Password is required";

        return errors;
    };

    // Submit function for client login form
    const loginSubmitForm = (values: LoginFormType) => {
        // Payload for login
        const payload = {
            email: values.email.trim(),
            password: values.password,
        };

        localStorage.setItem("token", "fake-token");
        localStorage.setItem("role", siteConfig.role.admin); // Replace with actual role
        window.location.href = path.dashboard;

        // Trigger the mutation for client login
        login(
            payload, // Payload for client login
            {
                onSuccess: (res) => {
                    console.log(res);
                    toast.success("Logged in successfully"); // Show success message
                    localStorage.setItem("token", "fake-token");
                    localStorage.setItem("role", siteConfig.role.admin); // Replace with actual role
                    window.location.href = path.dashboard;
                },
                onError: (error) => {
                    console.log(error);
                    toast.error("something went wrong");
                },
            }
        );
    };

    // Formik hook for login form
    const loginFormik = useFormik({
        // Initial values for the form
        initialValues: {
            email: "",
            password: "",
        },
        validateOnChange: true,
        validateOnBlur: true,
        validate: validateLoginForm, // Validation function defined above
        onSubmit: loginSubmitForm, // Submit function defined above
    });

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Login</h2>
                            <form className="form" onSubmit={loginFormik.handleSubmit}>
                                <div className="mb-3">
                                    <InputField
                                        placeholder="Email"
                                        type="email"
                                        name="email"
                                        label="Email"
                                        asterisk={true}
                                        onBlur={loginFormik.handleBlur}
                                        value={loginFormik.values.email}
                                        onchangeCallback={loginFormik.handleChange}
                                        inputClassName={
                                            loginFormik.touched.email && loginFormik.errors.email ? " is-invalid" : ""
                                        }
                                        requiredMessage={loginFormik.touched.email && loginFormik.errors.email}
                                        requiredMessageLabel={
                                            loginFormik.touched.email || loginFormik.isSubmitting
                                                ? loginFormik.errors.email
                                                : ""
                                        }
                                    />
                                </div>
                                <div className="mb-4">
                                    <InputField
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                        label="Password"
                                        asterisk={true}
                                        maxLength={20}
                                        onBlur={loginFormik.handleBlur}
                                        value={loginFormik.values.password}
                                        onchangeCallback={loginFormik.handleChange}
                                        inputClassName={
                                            loginFormik.touched.password && loginFormik.errors.password
                                                ? " is-invalid"
                                                : ""
                                        }
                                        requiredMessage={loginFormik.touched.password && loginFormik.errors.password}
                                        requiredMessageLabel={
                                            loginFormik.touched.password || loginFormik.isSubmitting
                                                ? loginFormik.errors.password
                                                : ""
                                        }
                                    />
                                </div>
                                <Button
                                    btnText="Login" // Button text
                                    onClick={() => loginFormik.handleSubmit} // Form submission handler
                                    disabled={isLoading} // Disable button while loading
                                    isLoading={isLoading} // Show loading spinner
                                    type="submit"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
