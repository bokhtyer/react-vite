import "./CustomCheckBox.scss";

export default function CustomCheckBox(props: any) {
    return (
        <div className={`custom-checkbox-filed ${props.className ? props.className : ""}`}>
            <input
                type="checkbox"
                id={props?.id}
                autoComplete="off"
                name={props?.inputName}
                value={props?.value}
                onChange={props?.onchangeCallback}
                ref={props?.inputRef}
                defaultChecked={props?.defaultChecked}
                disabled={props?.disabled}
                checked={props?.checked}
            />
            <label className={props?.disabled ? "disabled" : ""} htmlFor={props?.id}>
                {props?.label}
            </label>
        </div>
    );
}
