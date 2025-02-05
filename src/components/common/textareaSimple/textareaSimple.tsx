import "./styles/textareaSimple.scss";

const TextareaSimple = (props: any) => {
    const active = props.textAlign ? "right-input-text" : "";
    const isError = props.isError || "";
    const isDisabled = props.isDisabled || false;
    const disabledClass = isDisabled ? "disabled" : "";
    return (
        <div className={`simple_textarea_block ${props.className}`}>
            <label htmlFor="">
                <span className={"label_name"}>
                    {props.inputLabel}{" "}
                    <strong className={props.asterisk ? "asterisk name" : "name"}>{props.asterisk && "*"}</strong>
                </span>
            </label>
            <div className="relative">
                <textarea
                    className={`input-box ${
                        props.type === "file" ? "inp-file" : "input"
                    } ${active} ${isError} ${disabledClass} ${props.inputClassName}`}
                    name={props.name}
                    value={props.value}
                    id={props.id}
                    onChange={props.onchangeCallback}
                    placeholder={props.placeholder}
                    onBlur={props.onBlur}
                    disabled={props.disabled}
                    maxLength={props.maxLength}
                    style={{ minHeight: props.height || "150px" }}
                />
                {props.maxLength && (
                    <span className="length-text">
                        {props?.value?.length} / {props.maxLength}
                    </span>
                )}
            </div>

            {props.requiredMessage ? <span className="error-message">{props.requiredMessageLabel}</span> : ""}
        </div>
    );
};

export default TextareaSimple;
