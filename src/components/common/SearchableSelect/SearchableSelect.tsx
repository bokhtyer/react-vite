import React, { useEffect, useRef, useState } from "react";
import "./Style.scss";

const SearchableSelect = (props: any) => {
    const [inputText, setInputText] = useState("");
    const [showOption, setShowOption] = useState(false);
    const [selectOptions, setSelectOptions] = useState(props.options);
    const [isSubmit, setIsSubmit] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props?.modal) {
            setInputText(showOption ? "" : "Assigned to");
        }
    }, [props.modal, showOption]);

    useEffect(() => {
        setSelectOptions(props.options);
    }, [props.options]);

    const handleInputText = (value: string) => {
        setInputText(value);
        setShowOption(true);
        if (value !== "") {
            if (!props.search) {
                const filterText = props.options.filter((item: any) => {
                    return (
                        item.label.toLowerCase().includes(value.toLowerCase()) ||
                        (item.phone && item.phone.toLowerCase().includes(value.toLowerCase())) ||
                        (item.customer_id && item.customer_id.toLowerCase().includes(value.toLowerCase()))
                    );
                });
                setSelectOptions(filterText);
            }
        } else {
            setSelectOptions(props.options);
        }
    };

    const handleOption = (value: string) => {
        const selectValue = selectOptions.find((item: any) => item.value === value);
        if (selectValue) {
            if (props?.formik) {
                props?.formik?.setFieldValue(props?.name, selectValue.value);
            }
            if (props.handleChange) props.handleChange(selectValue.value);
            setInputText(selectValue.label);
        }
        setShowOption(false);
        setSelectOptions(props.options);
    };

    const closeSelect = () => {
        setShowOption(false);
        const value = props.options.find((item: any) => item.label === inputText);
        if (!value) {
            setInputText("");
            if (props.onChange) props.onChange("");
            if (props.formik) props.formik.setFieldValue(props.name, "");
        } else {
            if (props.formik) props.formik.setFieldValue(props.name, value.value);
        }
        setSelectOptions(props.options);
    };

    useEffect(() => {
        if (props.formik && props.formik.isSubmitting) {
            setIsSubmit(true);
        }
    }, [props.formik && props.formik.isSubmitting]);

    useEffect(() => {
        if (props.value !== undefined && props.value !== null) {
            const filterText = props.options.find((item: any) => item.value === props.value);
            if (filterText) {
                if (props.formik) props.formik.setFieldValue(props.name, filterText.value);
                setInputText(filterText.label);
            } else {
                if (props.formik) props.formik.setFieldValue(props.name, props.value);
                setInputText(props.value);
            }
        } else {
            if (props.formik) props.formik.setFieldValue(props.name, "");
            setInputText("");
        }
    }, [props.value, props.options]);

    const resetSearchData = () => {
        setInputText("");
        if (props.onChange) props.onChange("");
        if (props.formik) props.formik.setFieldValue(props.name, "");
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteText = event.clipboardData.getData("Text");
        event.preventDefault();
        handleInputText(pasteText);
        if (props.onChange) props.onChange(pasteText);
    };

    // Calculate dropdown position
    const dropdownPosition = () => {
        if (selectRef.current) {
            const { bottom } = selectRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            return bottom + 300 < viewportHeight ? "below" : "above";
        }
        return "below"; // Default position
    };

    return (
        <div className={`${props.modal ? "select-modal-type" : ""}`} ref={selectRef}>
            <div className="select-field">
                {props.labelText && (
                    <label htmlFor={props.id}>
                        <span className={"label_name"}>{props.labelText}</span>
                    </label>
                )}
                <div className={`close-select ${showOption ? "show" : ""}`} onClick={closeSelect}></div>
                <div className={`select-area-section ${showOption ? "show" : ""}`}>
                    <div className="select-area">
                        <i className="bi bi-search" />
                        <input
                            id={props.id}
                            name={props.name}
                            ref={props.inputRef}
                            type="text"
                            value={inputText}
                            onChange={(e) => {
                                handleInputText(e.target.value);
                                if (props.formik) props.formik.handleChange(e);
                                if (props.onChange) props.onChange(e.target.value);
                            }}
                            onPaste={handlePaste}
                            autoComplete="off"
                            onClick={() => {
                                if (props?.modal) {
                                    setShowOption(true);
                                } else {
                                    setShowOption(!showOption);
                                }
                                if (props.onClick) props.onClick();
                            }}
                            placeholder={props.placeholder || props.labelText}
                            disabled={props.disabled}
                            onBlur={props.formik && props.formik.handleBlur}
                            onFocus={props.onFocus}
                        />
                        {!props.modal && inputText && (
                            <i onClick={resetSearchData} className="bi bi-x-circle-fill close" />
                        )}
                        {props.formik && props.formik.errors[props.name] && (
                            <div className="search-error-message">
                                {isSubmit && <span>{props.formik.errors[props.name]}</span>}
                            </div>
                        )}
                        <div className="input-options-section">
                            <div
                                className={`input-options ${props.multiValue && "multi-value"} ${
                                    showOption ? "active" : ""
                                } ${props.formik && props.formik.errors[props.name] && "margin"}`}
                                onScroll={props.onScroll}
                                style={{
                                    position: "absolute",
                                    [dropdownPosition() === "below" ? "top" : "bottom"]: "100%",
                                    left: 0,
                                    right: 0,
                                    zIndex: 9999999,
                                    display: showOption ? "block" : "none",
                                }}
                            >
                                {props.loading ? (
                                    <span>Loading...</span>
                                ) : (
                                    <>
                                        {selectOptions?.length > 0 ? (
                                            selectOptions?.map((option: any, index: any) => (
                                                <p key={index} onClick={() => handleOption(option.value)}>
                                                    <div className="select-content">
                                                        <span>{option.label}</span>
                                                        {option.customer_id && <span>({option.customer_id})</span>}
                                                        {option.phone && <h6>{option.phone}</h6>}
                                                    </div>
                                                </p>
                                            ))
                                        ) : (
                                            <span>No Options</span>
                                        )}
                                        {props.optionLoading && <span>Loading...</span>}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchableSelect;
