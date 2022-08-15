import { useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditUserNamePopup({
    isOpen,
    onSubmit,
    onOutSideButtonClick,
    currentUser
}) {

    const [userName, setUserName] = useState(currentUser.name);

    const handleNameChange = (event) => {
        setUserName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(userName);
    }

    useEffect(() => {
        setUserName(currentUser.name);
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onSubmit={handleSubmit}
            submitText={'Save'}
            onBottomButtonClick={onOutSideButtonClick}
            bottomButtonText={'Sign out'}>
            <div className="popup__input-container">
                <input className='popup__input' value={userName} onChange={handleNameChange} maxLength='30' required/>
                <label className={`popup__label ${userName && "popup__label_active"}`}>User name</label>
            </div>
        </PopupWithForm>
    );
}

export default EditUserNamePopup;
