import Button from "../button/Button";
import { Modal } from "../Modal/Modal";
import "./DoubleConfirmationModal.scss";

function DoubleConfirmationModal(props: any) {
    const {
        isOpen,
        onClose,
        onConfirm,
        icon,
        iconClassName,
        title,
        description,
        isConfirm = true,
        isCancel = true,
        confirmBtnText = "Confirm",
        cancelBtnText = "Cancel",
        confirmBtnClassName,
        cancelBtnClassName,
        isLoading = false,
        isDisabled = false,
    } = props;
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="extra_small" isHeader={false}>
            <div className="double-confirmation-modal text-center pl-3 pr-3 pt-2 pb-2">
                {icon ? (
                    <div
                        className={`w-16 h-16 mx-auto flex items-center justify-center rounded-full border-2 mb-4 ${
                            iconClassName || "border-green-500 text-green-500"
                        }`}
                    >
                        {icon}
                    </div>
                ) : (
                    <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full border-2 border-red-500 text-red-500 mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                )}

                {title && <h2 className="text-lg font-semibold text-heading-color mb-2">{title}</h2>}

                {description && <p className="text-sm text-text-color mb-6">{description}</p>}

                <div>
                    <div className="flex justify-center gap-4">
                        {isCancel && (
                            <div>
                                <Button
                                    onClick={onClose}
                                    btnText={cancelBtnText}
                                    btnClassName={`!py-[12px] !px-[32px] !bg-gray-100 !text-gray-800 !hover:bg-gray-200 !transition ${cancelBtnClassName}`}
                                    disabled={isDisabled || isLoading}
                                />
                            </div>
                        )}
                        {isConfirm && (
                            <Button
                                onClick={handleConfirm}
                                btnText={confirmBtnText}
                                btnClassName={`!py-[12px] !px-[32px] ${confirmBtnClassName}`}
                                isLoading={isLoading}
                                disabled={isDisabled || isLoading}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default DoubleConfirmationModal;
