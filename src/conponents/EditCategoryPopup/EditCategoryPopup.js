import './EditCategoryPopup.css';

import React, { useRef, useEffect } from 'react';
import { categories } from "../../utils/constants";

function EditCategoryPopup({
    isOpen,
    onSubmit,
    item
}) {

    const topRef = useRef();

    function handleSubmit(category) {
        onSubmit({ name: item.name, quantity: item.quantity, _id: item._id, category: category, checked: item.checked, lastCategory: item.category }); //TODO
    }

    useEffect(() => {
        topRef.current.scrollIntoView();
    }, [isOpen]);

    return (
        <div className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__category-container">
                <p className='popup__category-title'>Choose category</p>
                <ul className='popup__category-list'>
                    <div ref={topRef}></div>
                    {
                        categories.map((category, index) => (
                            <li className="popup__category" key={index} onClick={() => handleSubmit(category.number)}>
                                <img className="popup__category-image" src={category.icon} />
                                <p className="popup__category-name">{category.name}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default EditCategoryPopup;
