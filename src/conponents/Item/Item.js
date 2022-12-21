import './Item.css';
import checkMark from '../../images/check.svg'
import trash from '../../images/delete.svg'
import { categories } from '../../utils/constants';

function Item({
    item,
    handleItemCheck,
    onCategoryClick,
    onEditItemClick,
    onTrashClick,
}) {

    const onItemClick = (event) => {
        if (event.target === event.currentTarget || event.target.className.includes('item__name'))
            onEditItemClick(item);
    }

    const onItemCheckClick = (event) => {
        handleItemCheck(item);
        getCategoryData(item.category);
    }

    const getCategoryData = (categoryNumber) => {
        return categories.filter(item => item.number === categoryNumber)[0];
    }

    return (
        <li className={`item ${item.checked && "item_checked"}`} onClick={onItemClick} >
            <div className='checkbox__wrapper' onClick={onItemCheckClick}>
                <img className={`checkbox ${item.checked && "checkbox_visible"}`} src={checkMark} />
            </div>
            <p className='item__name'>{item.name}</p>
            <p className='item__quantity'>{item.quantity}</p>
            <div className='item__popup-container'>
                <img className='item__category' src={getCategoryData(item.category).icon} onClick={() => onCategoryClick(item)} />
                <p className='item__popup'>{getCategoryData(item.category).name}</p>
            </div>
            <div className='item__action-wrapper'>
                <img className='item__action' src={trash} onClick={() => onTrashClick(item)} />
            </div>
        </li>
    );
}

export default Item;