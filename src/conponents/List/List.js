import './List.css';

import AddItemForm from '../AddItemForm/AddItemForm';
import Items from '../Items/Items';

function List({
    currentList,
    handleAddItemSubmit,
    handleItemClick,
    handleEditListClick,
    handleCategoryClick,
}) {
    if (currentList._id !== '') return (
        <>
            <AddItemForm
                onSubmit={handleAddItemSubmit} />
            <Items
                list={currentList}
                onItemClick={handleItemClick}
                onSettingsClick={handleEditListClick}
                onCategoryClick={handleCategoryClick} />
        </>
    )
}

export default List;