import { Link } from "react-router-dom";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./static/InputPhone.scss";

interface InputPhoneFieldProps {
    textAlign?: string;
    isError?: string;
    isDisabled?: boolean;
    className?: string;
    inputLabel: string;
    asterisk?: boolean;
    labelLink?: string;
    labelLinkText?: string;
    labelOnChangeCallback?: () => void;
    inputClassName?: string;
    country?: string;
    value: string;
    inputName: string;
    disabled?: boolean;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    countryCodeEditable?: boolean;
    onchangeCallback?: (value: string) => void;
    requiredMessage?: string | boolean;
    requiredMessageLabel?: string;
    whiteSpace?: boolean;
    isMultiple?: boolean;
}

const InputPhoneField: React.FC<InputPhoneFieldProps> = (props) => {
    const active = props.textAlign ? "right-input-text" : "";
    const isError = props.isError || "";
    const isDisabled = props.isDisabled || false;
    const disabledClass = isDisabled ? "disabled" : "";

    return (
        <div className="phone_block">
            <div className={`single-input ${props.className}`}>
                <label htmlFor="">
                    <span className={"name"}>
                        {props.inputLabel}{" "}
                        <strong className={props.asterisk ? "asterisk name" : "name"}>{props.asterisk && "*"}</strong>
                    </span>
                    {props.labelLink && (
                        <span className="link">
                            <Link to={props.labelLink}>{props.labelLinkText}</Link>
                        </span>
                    )}
                    {props.labelOnChangeCallback && (
                        <span className="link">
                            <a href={void 0} onClick={props.labelOnChangeCallback}>
                                {props.labelLinkText}
                            </a>
                        </span>
                    )}
                </label>
                <div className="input-box">
                    <PhoneInput
                        // id={props.id}
                        inputClass={`input-box ${active} ${isError} ${disabledClass} ${props.inputClassName}`}
                        country={"tr"}
                        autoFormat={false}
                        value={props.value}
                        inputProps={{
                            name: props.inputName,
                            maxLength: 14,
                            minLength: 5,
                        }}
                        disabled={props.disabled}
                        onBlur={props.onBlur}
                        onFocus={props.onFocus}
                        countryCodeEditable={props.countryCodeEditable}
                        onChange={(event) => props.onchangeCallback && props.onchangeCallback(event)}
                        // error={true}
                    />
                    {props.requiredMessage ? (
                        <span className="phn-error-message">{props.requiredMessageLabel}</span>
                    ) : props.whiteSpace === false ? (
                        ""
                    ) : (
                        " "
                    )}
                </div>
            </div>
        </div>
    );
};

export default InputPhoneField;
