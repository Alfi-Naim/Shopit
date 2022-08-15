import { useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditListPopup({
    isOpen,
    onSubmit,
    onOutSideButtonClick,
    currentList
}) {

    const [listName, setListName] = useState(currentList ? currentList.name : "");
    // const [listName, setListName] = useState(currentList.name);

    const handleNameChange = (event) => {
        setListName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(listName);
    }

    useEffect(() => {
        setListName(currentList.name);
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onSubmit={handleSubmit}
            submitText={'Save'}
            onBottomButtonClick={onOutSideButtonClick}
            bottomButtonText={'Delete List'}>
            <div className="popup__input-container">
                <input className='popup__input' value={listName || ""} onChange={handleNameChange} maxLength='30' required/>
                <label className={`popup__label ${listName && "popup__label_active"}`}>List name</label>
            </div>
        </PopupWithForm>
    );
}

export default EditListPopup;
