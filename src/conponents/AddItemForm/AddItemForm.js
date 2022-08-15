import './AddItemForm.css';
import { useState } from "react";

function AddItemForm({
    onSubmit,
}) {

    const [itemName, setItemName] = useState("");

    const handleNameChange = (event) => {
        setItemName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(itemName);
        setItemName("");
    }

    return (
        <form className='add-item__form' onSubmit={handleSubmit}>
            <input className='add-item__input' value={itemName} onChange={handleNameChange} placeholder='Add item' required />
            <button className='add-item__button' type='submit'>+</button>
        </form>
    );
}

export default AddItemForm;