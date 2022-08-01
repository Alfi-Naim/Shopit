import { useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddListPopup({
    isOpen,
    onSubmit
}) {

    const [listName, setListName] = useState("");

    const handleNameChange = (event) => {
        setListName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(listName);
    }

    useEffect(() => {
        setListName("");
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onSubmit={handleSubmit}
            submitText={'Create List'}>
            <div className="popup__input-container">
                <input className='popup__input' value={listName} required onChange={handleNameChange} />
                <label className={`popup__label ${listName && "popup__label_active"}`}>List name</label>
            </div>
        </PopupWithForm>
    );
}

export default AddListPopup;
