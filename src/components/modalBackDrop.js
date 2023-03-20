function ModalBackdrop({ children, onConfirm }) {
    const handleClickBackdrop = (e) => {
        if (e.target.className === "backdrop") onConfirm();
    };

    return (
        <section className={"backdrop"} onClick={handleClickBackdrop}>
            {children}
        </section>
    );
}

export default ModalBackdrop;
