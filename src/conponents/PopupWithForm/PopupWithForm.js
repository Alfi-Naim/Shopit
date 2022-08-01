import './PopupWithForm.css';

function PopupWithForm({
    isOpen,
    onSubmit,
    submitText,
    onBottomButtonClick,
    bottomButtonText,
    children,
}) {

    return (
        <div className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__form-container">
                <form className="popup__form" onSubmit={onSubmit}>
                    <div className="popup__form-wrapper">
                        {children}
                        <button className="popup__submit-button" type="submit">{submitText}</button>
                    </div>
                    { onBottomButtonClick && <button className="popup__bottom-button" type='button' onClick={onBottomButtonClick}>{bottomButtonText}</button> }
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;