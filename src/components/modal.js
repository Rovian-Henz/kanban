import ReactDOM from "react-dom";
import GeneralButton from "./generalButton";
import "../styles/modal.css";

const Backdrop = ({ children, onConfirm }) => {
    return (
        <div className={"backdrop"} onClick={onConfirm}>
            {children}
        </div>
    );
};

const ModalOverlay = ({ title, content, onConfirm }) => {
    return (
        <div className="modal">
            <header className={"header"}>
                <h2>{title}</h2>
            </header>
            <div className={"content"}>
                <p>{content}</p>
            </div>
            <footer className={"actions"}>
                <GeneralButton handleClick={onConfirm}>Okay</GeneralButton>
            </footer>
        </div>
    );
};

function Modal({ title, content, onConfirm }) {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={onConfirm}>
                    <ModalOverlay
                        title={title}
                        content={content}
                        onConfirm={onConfirm}
                    />
                </Backdrop>,
                document.getElementById("overlay-root")
            )}
        </>
    );
}

export default Modal;
