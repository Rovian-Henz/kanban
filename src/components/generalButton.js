import "../styles/generalButton.css";

function GeneralButton({ children, handleClick }) {
    return (
        <div className="button general" onClick={handleClick}>
            {children}
        </div>
    );
}

export default GeneralButton;
