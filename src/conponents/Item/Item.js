import './Item.css';
import checkMark from '../../images/check.svg'
import box from '../../images/box.svg'
import trash from '../../images/delete.svg'
import pen from '../../images/edit.svg'

function Item({
    item,
    onItemClick,
    onCategoryClick,
    onPenClick,
    onTrashClick,
}) {

    const onClick = (event) => {
        if (event.target === event.currentTarget) {
            onItemClick(item);
        }
    }

    return (
        <li className={`item ${item.checked && "item_checked"}`} onClick={onClick}>
            <img className='item__category' src={item.checked ? checkMark : box} onClick={() => onCategoryClick(item)} />
            <p className='item__name'>{item.name}</p>
            <img className='item__action item__action_small' src={pen} onClick={() => onPenClick(item)}/>
            <p className='item__quantity'>{item.quantity}</p>
            <img className='item__action' src={trash} onClick={() => onTrashClick(item)}/>
        </li>
    );
}

export default Item;