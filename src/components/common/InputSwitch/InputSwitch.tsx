import "./Style.scss";

type propsType = {
    status?: boolean;
    onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    isLoading?: boolean;
    labelText?: string;
    name?: string;
};

const InputSwitch = (props: propsType) => {
    const { status, onClick, labelText, name } = props;

    return (
        <>
            <div className="single-input-switch">
                <label className={`active_status_switch ${labelText ? "labeltext" : ""}`}>
                    <input
                        name={name ? name : "status"}
                        className="blog_status"
                        type="checkbox"
                        disabled={props.disabled}
                        checked={status}
                        onChange={onClick}
                    />
                    <span className="slider round"></span>
                    {labelText && <span className="label-text">{labelText}</span>}
                </label>
                {props?.isLoading && <i className="fas fa-spinner fa-spin mr-5px" />}
            </div>
        </>
    );
};

export default InputSwitch;
