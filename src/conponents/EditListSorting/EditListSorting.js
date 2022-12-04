import './EditListSorting.css';

import { sorting } from "../../utils/constants";

function EditListSorting({
    isOpen,
    onSubmit,
}) {

    function handleSubmit(category) {
        onSubmit(category);
    }

    return (
        <div className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__category-container">
                <p className='popup__category-title'>List sort options</p>
                <ul className='popup__category-list'>
                    {
                        sorting.map((category, index) => (
                            <li className="popup__category" key={index} onClick={() => handleSubmit(category.name)}>
                                <p className="popup__category-name">{category.name}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default EditListSorting;
