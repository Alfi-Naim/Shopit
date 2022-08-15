import { useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({
    isOpen,
    onSubmit,
    currentUser
}) {

    const [avatar, setAvatar] = useState(currentUser.avatar);

    const handleAvatarChange = (event) => {
        setAvatar(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(avatar);
    }

    useEffect(() => {
        setAvatar(currentUser.avatar);
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onSubmit={handleSubmit}
            submitText={'Save'}>
            <div className="popup__input-container">
                <div>
                    <img className='popup__image' src={avatar} />
                </div>
                <input className='popup__input' value={avatar} onChange={handleAvatarChange} type='url' required/>
                <label className={`popup__label ${avatar && "popup__label_active"}`}>Image link</label>
            </div>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
