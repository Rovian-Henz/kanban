import GeneralButton from "./generalButton";
import { Check, Share, Trash } from "../icons/icons.js";
import { useState, useEffect } from "react";
import { getCurrentHost } from "../config/handleRoutes";

function ModalOverlay({ task, onConfirm, onDelete }) {
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
        if (!copiedItem) {
            setCopiedItem(true);
            navigator.clipboard.writeText(
                `http://${getCurrentHost()}/tasks/${task.id}`
            );
        }
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
}

export default ModalOverlay;
