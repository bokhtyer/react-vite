import Modal from "react-bootstrap/Modal";
import Button from "../button/Button";

import "./styles/modalBootstrap.scss";
import { IoMdClose } from "react-icons/io";

const ModalBootstrap = (props: any) => {
    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
                size={props.size}
                dialogClassName={`modal-dialog-centered ${props.class ? props.class : ""}`}
            >
                {!props.header ? (
                    <Modal.Header closeButton>
                        <Modal.Title className="w-100">
                            {props.backArrow && (
                                <span onClick={props.handleBackPage} className="back-page-arrow ">
                                    <i className="fas fa-arrow-left" /> {props.backText ? props.backText : ""}
                                </span>
                            )}{" "}
                            {props.title}
                        </Modal.Title>
                        {props.modalHeaderbtn && (
                            <Button btnClassName="video-top-btn" btnText={props.modalHeaderbtnText} />
                        )}
                        <div onClick={() => props.handleClose()} className="modal-close-b">
                            <IoMdClose />
                        </div>
                    </Modal.Header>
                ) : (
                    ""
                )}
                {props.children}
            </Modal>
        </>
    );
};

export default ModalBootstrap;
