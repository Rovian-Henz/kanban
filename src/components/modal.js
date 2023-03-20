import ReactDOM from "react-dom";
import ModalOverlay from "./modalOverlay";
import ModalBackdrop from "./modalBackDrop";
import "../styles/modal/modal.css";

function Modal({ task, onConfirm, onDelete }) {
    return (
        <>
            {ReactDOM.createPortal(
                <ModalBackdrop onConfirm={onConfirm}>
                    <ModalOverlay
                        task={task}
                        onConfirm={onConfirm}
                        onDelete={onDelete}
                    />
                </ModalBackdrop>,
                document.getElementById("overlay-root")
            )}
        </>
    );
}

export default Modal;
