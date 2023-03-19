import ReactDOM from "react-dom";
import GeneralButton from "./generalButton";
import "../styles/modal.css";
import { Check, Share, Trash } from "../icons/icons.js";
import { useState, useEffect } from "react";

const fetchAddress = "http://localhost:8001";

const Backdrop = ({ children, onConfirm }) => {
    const handleClickBackdrop = (e) => {
        if (e.target.className === "backdrop") onConfirm();
    };

    return (
        <div className={"backdrop"} onClick={handleClickBackdrop}>
            {children}
        </div>
    );
};

const ModalOverlay = ({ task, onConfirm, onDelete }) => {
    const [copiedItem, setCopiedItem] = useState(false);

    useEffect(() => {
        if (copiedItem) {
            const timer = setTimeout(() => {
                setCopiedItem(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [copiedItem]);

    const onShareHandle = () => {
        setCopiedItem(true);
        navigator.clipboard.writeText(`${fetchAddress}/tasks/${task.id}`);
    };

    return (
        <div className="modal">
            <div className="info">
                <header className={"header"}>
                    <h2 className="title">{task.title}</h2>
                </header>
                <div className={"content"}>
                    <h3 className="title">Description</h3>
                    <p className="description">{task.content}</p>
                </div>
            </div>
            <footer className={"actions"}>
                <div className="items">
                    <GeneralButton
                        handleClick={onDelete}
                        specificClass={"modalBtn"}
                    >
                        <Trash />
                    </GeneralButton>
                    <GeneralButton
                        handleClick={onShareHandle}
                        specificClass={"modalBtn"}
                    >
                        <Share />
                        {copiedItem && (
                            <span className="linkCopy">
                                Link to card copied
                            </span>
                        )}
                    </GeneralButton>
                    <GeneralButton
                        handleClick={onConfirm}
                        specificClass={"modalBtn"}
                    >
                        <Check />
                    </GeneralButton>
                </div>
            </footer>
        </div>
    );
};

function Modal({ task, onConfirm, onDelete }) {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={onConfirm}>
                    <ModalOverlay
                        task={task}
                        onConfirm={onConfirm}
                        onDelete={onDelete}
                    />
                </Backdrop>,
                document.getElementById("overlay-root")
            )}
        </>
    );
}

export default Modal;
