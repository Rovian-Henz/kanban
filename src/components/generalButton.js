import "../styles/generalButton.css";

function GeneralButton({ children, handleClick, specificClass = "" }) {
    return (
        <div className={`button ${specificClass}`} onClick={handleClick}>
            {children}
        </div>
    );
}

export default GeneralButton;
