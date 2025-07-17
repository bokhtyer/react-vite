import type React from "react";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import "./Style.scss";

export type ModalSize = "extra_small" | "small" | "medium" | "large" | "extra_large" | "full_screen";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    size?: ModalSize;
    title?: string;
    showCloseButton?: boolean;
    className?: string;
    header?: React.ReactNode;
    isHeader?: boolean;
}

const sizeClasses = {
    extra_small: "max-w-[380px]",
    small: "max-w-md",
    medium: "max-w-lg",
    large: "max-w-2xl",
    extra_large: "max-w-4xl",
    full_screen: "max-w-full max-h-full w-full h-full rounded-none",
};

export function Modal({
    isOpen,
    onClose,
    children,
    size = "medium",
    title,
    showCloseButton = true,
    className = "",
    isHeader = true,
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            // Prevent body scroll when modal opens
            document.body.style.overflow = "hidden";
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
            // Restore body scroll when modal closes
            document.body.style.overflow = "unset";
            setTimeout(() => setShouldRender(false), 300);
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && modalRef.current) {
            // Zoom effect when clicking outside
            modalRef.current.style.transform = "scale(1.02)";
            setTimeout(() => {
                if (modalRef.current) {
                    modalRef.current.style.transform = "scale(1)";
                }
            }, 400);
        }
    };

    if (!shouldRender) return null;

    return (
        <div className={`modal-backdrop ${isAnimating ? "modal-backdrop-open" : ""}`} onClick={handleBackdropClick}>
            <div
                ref={modalRef}
                className={`modal-content ${className} ${sizeClasses[size]} ${isAnimating ? "modal-content-open" : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                {isHeader && (
                    <>
                        {(title || showCloseButton) && (
                            <div className="modal-header">
                                {title && <h2 className="text-xl font-semibold text-gray-900">{title}</h2>}
                                {showCloseButton && (
                                    <button onClick={onClose} className="modal-close-button" aria-label="Close modal">
                                        <IoClose size={20} />
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}

                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
}
