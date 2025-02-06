import Button from "../button/Button";
import ModalBootstrap from "../modalBootstrap/ModalBootstrap";
import "./DoubleConfirmationModal.scss";

function DoubleConfirmationModal(props: any) {
    return (
        <div>
            <ModalBootstrap
                show={props.open}
                handleClose={() => {
                    props.close(false);
                }}
                size="md"
                class="double-confirmation"
            >
                <div className="modal-body">
                    {props.icon && (
                        <div
                            className="icon"
                            style={{
                                color: props.iconColor || "#FF0000",
                            }}
                        >
                            {props.icon}
                        </div>
                    )}
                    <p>{props.text}</p>
                </div>
                <div className="modal-footer justify-content-center">
                    <Button
                        type="submit"
                        onClick={() => props.close(false)}
                        btnText="Cancel"
                        disabled={props.loading}
                        variant="btn-cancel"
                    />
                    <Button
                        type="submit"
                        onClick={props.submit}
                        isLoading={props.loading}
                        disabled={props.loading || props.disabled}
                        btnClassName={props.className}
                        btnText={props.btnText || "Confirm"}
                    />
                </div>
            </ModalBootstrap>
        </div>
    );
}

export default DoubleConfirmationModal;
