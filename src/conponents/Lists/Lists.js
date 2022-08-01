import './Lists.css';

function Lists({
    lists,
    currentList,
    loadList,
    onCreateListClick
}) {
 
  return (
    <div className='lists__wrapper'>
        <ul className='lists'>
            {
                lists.map((list, index) => (
                    <li className={`lists__item ${list._id === currentList._id && "lists__item_selected"}`} key={index} onClick={() => loadList(list._id)}>
                        <p className='lists__item-title'>{list.name}</p>
                    </li>
                ))
            }
        </ul>
        <button className='lists__button' onClick={onCreateListClick}>+</button>
    </div>
  );
}

export default Lists;
