import Button from "../button/Button";
import "./DoubleConfirmationModal.scss";

function DoubleConfirmationModal(props: any) {
    const { isOpen, onClose, onConfirm } = props;
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };
    return (
        <div className="double-confirmation-modal" style={{ display: isOpen ? "block" : "none" }}>
            Create Modal
            <div className="modal-body">
                <p>Are you sure you want to proceed?</p>
            </div>
            <div className="modal-footer">
                <Button onClick={handleConfirm} btnText="Confirm" />
                <Button onClick={onClose} btnText="Cancel" />
            </div>
        </div>
    );
}

export default DoubleConfirmationModal;
