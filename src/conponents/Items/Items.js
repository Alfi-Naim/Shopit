import Item from '../Item/Item';
import './Items.css';

import settings from '../../images/settings.svg'
import sort from '../../images/sort.svg'
import filter from '../../images/filter.svg'

function Items({
    list,
    onItemClick,
    onCategoryClick,
    onSettingsClick,
    onPenClick,
    onTrashClick,
    onFilterListClick,
    onSortListClick
}) {

    return (
        <>
            <div className='list__header'>
                <h2 className='list__title'>{list.name || "..."}</h2>
                <div className='list__action-wrapper'>
                    <img className='list__action' src={filter} onClick={onFilterListClick} />
                    <img className='list__action' src={sort} onClick={onSortListClick} />
                    <img className='list__action' src={settings} onClick={onSettingsClick} />
                </div>
            </div>
            <ul className='list'>
                {
                    list.items.map((item, index) => (
                        <Item
                            key={index}
                            item={item}
                            onItemClick={onItemClick}
                            onCategoryClick={onCategoryClick}
                            onPenClick={onPenClick}
                            onTrashClick={onTrashClick}
                        />
                    ))

                }
            </ul>
        </>
    );
}

export default Items;