"use client";
import React, { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import "./InputField.scss";

type InputFieldProps = {
    textAlign?: string;
    isError?: string;
    isDisabled?: boolean;
    isMultiple?: boolean;
    type?: string;
    label?: string;
    asterisk?: boolean;
    labelOnChangeCallback?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    showChangeField?: boolean;
    labelLinkText?: string;
    className?: string;
    groupIcon?: string;
    id?: string;
    inputClassName?: string;
    placeholder?: string;
    accept?: string;
    value?: string;
    onchangeCallback?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    name?: string;
    inputRef?: React.RefObject<HTMLInputElement>;
    maxLength?: number;
    disabled?: boolean;
    onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
    requiredMessage?: string | boolean;
    requiredMessageLabel?: string;
    whiteSpace?: boolean;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = (props) => {
    const active = props.textAlign ? "right-input-text" : "";
    const isError = props.isError || "";
    const isDisabled = props.isDisabled || false;
    const disabledClass = isDisabled ? "disabled" : "";
    const isMultiple = !!props.isMultiple;
    const [inputType, setInputType] = useState<string>(props.type || "");
    const passwordVisiablityClick = () => {
        setInputType(inputType === "password" ? "text" : "password");
    };
    return (
        <>
            <div className={`single-input ${props.className}`}>
                {props.label && (
                    <label htmlFor="">
                        <span className={"name"}>
                            {props.label}{" "}
                            <strong className={props.asterisk ? "asterisk name" : "name"}>
                                {props.asterisk && "*"}
                            </strong>
                        </span>
                        {props.labelOnChangeCallback && !props.showChangeField && (
                            <span className="link">
                                <a href={void 0} onClick={props.labelOnChangeCallback}>
                                    {props.labelLinkText}
                                </a>
                            </span>
                        )}
                    </label>
                )}

                {props.groupIcon ? <i className={`group-icon ${props.groupIcon}`}></i> : null}
                <div className="input-box">
                    <input
                        id={props.id}
                        className={`input-box ${
                            props.type === "file" ? "inp-file" : "input"
                        } ${active} ${isError} ${disabledClass} ${props.inputClassName}`}
                        placeholder={props.placeholder}
                        accept={props.accept}
                        type={inputType}
                        value={props.value}
                        onChange={props.onchangeCallback}
                        onBlur={props.onBlur}
                        autoComplete="off"
                        name={props.name}
                        ref={props.inputRef}
                        onKeyDown={props.onKeyDown}
                        multiple={isMultiple}
                        maxLength={props.maxLength || 50}
                        disabled={props.disabled}
                        onPaste={props.onPaste}
                        onWheel={(e) => e.currentTarget.blur()}
                    />
                    {props.requiredMessage ? (
                        <span className="error-message">
                            <IoMdInformationCircleOutline /> {props.requiredMessageLabel}
                        </span>
                    ) : props.whiteSpace === false ? (
                        ""
                    ) : (
                        " "
                    )}
                </div>
                {props.type === "password" && (
                    <span className="password-visiablity" onClick={passwordVisiablityClick}>
                        {inputType === "password" || props?.value?.length === 0 ? (
                            <i className="fa-regular fa-eye-slash"></i>
                        ) : (
                            <i className="fa-regular fa-eye"></i>
                        )}
                    </span>
                )}
            </div>
        </>
    );
};

export default InputField;
