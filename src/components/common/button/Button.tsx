import React from "react";
import "./Button.scss";

type ButtonProps = {
    type?: "button" | "submit" | "reset";
    inputRef?: React.RefObject<HTMLButtonElement>;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    btnText: string;
    btnClassName?: string;
    isLoading?: boolean;
    disabled?: boolean;
    variant?: "button-1" | "button-2" | "btn-success" | "btn-danger" | "btn-info" | "btn-cancel";
    size?: "btn-small" | "btn-large";
    icon?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
    type = "submit",
    inputRef,
    onClick,
    btnText = "Click",
    btnClassName = "",
    isLoading,
    disabled,
    variant = "button-1",
    size = "",
    icon,
}) => {
    const buttonClasses = ["custom-button", variant, size, btnClassName, isLoading ? "loading" : ""]
        .filter(Boolean)
        .join(" ");

    return (
        <button type={type} ref={inputRef} onClick={onClick} className={buttonClasses} disabled={isLoading || disabled}>
            {isLoading && (
                <span className="spinner">
                    <span className="spinner-inner"></span>
                </span>
            )}
            {!isLoading && icon && <span className="button-icon">{icon}</span>} {/* ✅ Prevents empty icon space */}
            <span className="button-text">{btnText}</span>
        </button>
    );
};

export default Button;
