import "../styles/generalButton.css";

function GeneralButton({ children, handleClick, specificClass = "" }) {
    return (
        <button className={`button ${specificClass}`} onClick={handleClick}>
            {children}
        </button>
    );
}

export default GeneralButton;
