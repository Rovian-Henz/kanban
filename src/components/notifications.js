import ReactDOM from "react-dom";
import { Close } from "../icons/icons";
import GeneralButton from "./generalButton";
import "../styles/notifications/notifications.css";

function Notifications({ type, title, content, onNotificationClose }) {
    const handleNotificationClose = () => {
        onNotificationClose();
    };

    return (
        <>
            {ReactDOM.createPortal(
                <div className={`notification ${type}`}>
                    <GeneralButton
                        handleClick={handleNotificationClose}
                        specificClass="closeNotification"
                    >
                        <Close />
                    </GeneralButton>
                    <h4 className="title">{title}</h4>
                    <p className="content">{content}</p>
                </div>,
                document.getElementById("notifications-root")
            )}
        </>
    );
}

export default Notifications;
