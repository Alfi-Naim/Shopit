import Item from '../Item/Item';
import './Items.css';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import settings from '../../images/settings.svg'
import sort from '../../images/sort.svg'

function Items({
    list,
    handleItemCheck,
    onCategoryClick,
    onSettingsClick,
    onEditItemClick,
    onTrashClick,
    onSortClick,
}) {

    const [parent, enableAnimations] = useAutoAnimate()

       function getSortedList() {
        switch(list.sortBy){
            case 'Name Ascending': return list.items.sort((a, b) => a.checked - b.checked ||  a.name.localeCompare(b.name));
            case 'Name Descending': return list.items.sort((a, b) => a.checked - b.checked ||  b.name.localeCompare(a.name));
            case 'Time Added Ascending': return list.items.sort((a, b) => a.checked - b.checked || a.createdAt.localeCompare(b.createdAt));
            case 'Time Added Descending': return list.items.sort((a, b) => a.checked - b.checked || b.createdAt.localeCompare(a.createdAt));
            case 'Category': return list.items.sort((a, b) => a.checked - b.checked || a.category - b.category);
            default: return list.items.sort((a, b) => a.checked - b.checked || b.createdAt.localeCompare(a.createdAt));
        }
    }

    return (
        <>
            <div className='list__header'>
                <h2 className='list__title'>{list.name || "..."}</h2>
                <div className='list__action-wrapper'>
                    <img className='list__action' src={sort} onClick={onSortClick} />
                    <img className='list__action' src={settings} onClick={onSettingsClick} />
                </div>
            </div>
            <ul className='list' ref={parent}>
                {
                    getSortedList().map((item, index) => (
                        <Item
                            key={item.name}
                            item={item}
                            handleItemCheck={handleItemCheck}
                            onCategoryClick={onCategoryClick}
                            onEditItemClick={onEditItemClick}
                            onTrashClick={onTrashClick} />
                    ))
                }
            </ul>
        </>
    );
}

export default Items;