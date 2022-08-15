import { useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditItemPopup({
    isOpen,
    onSubmit,
    item,
    onOutSideButtonClick,
}) {

    const [itemName, setItemName] = useState(item.name);
    const [itemQuantity, setItemQuantity] = useState(item.quantity);

    const handleNameChange = (event) => {
        setItemName(event.target.value);
    }

    const handleQuantityChange = (event) => {
        setItemQuantity(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ name: itemName, quantity: itemQuantity, _id: item._id, category: item.category, checked: item.checked }); //TODO
    }

    const handleDeleteClick = () => {
        onOutSideButtonClick(item);
    }

    useEffect(() => {
        setItemName(item.name);
        setItemQuantity(item.quantity);
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onSubmit={handleSubmit}
            submitText={'Save'}
            onBottomButtonClick={handleDeleteClick}
            bottomButtonText={'Delete Item'}>
            <div className="popup__input-container">
                <input className='popup__input' value={itemName || ""} id="name" name='name' onChange={handleNameChange} required/>
                <label className={`popup__label ${itemName && "popup__label_active"}`}>Item name</label>
            </div>
            <div className="popup__input-container">
                <input className='popup__input' value={itemQuantity || ""} name='quantity' type='number' onChange={handleQuantityChange} required/>
                <label className={`popup__label ${itemQuantity && "popup__label_active"}`}>Item quantity</label>
            </div>
        </PopupWithForm>
    );
}

export default EditItemPopup;
