function ModalBackdrop({ children, onConfirm }) {
    const handleClickBackdrop = (e) => {
        if (e.target.className === "backdrop") onConfirm();
    };

    return (
        <div className={"backdrop"} onClick={handleClickBackdrop}>
            {children}
        </div>
    );
}

export default ModalBackdrop;
