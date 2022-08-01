import './UserProfile.css';
import arrowDown from '../../images/arrow-down.svg'

function UserProfile({ 
    currentUser,
    onImageClick,
    onArrowClick
 }) {

    return (
        <div className='profile'>
            <div className='profile__image-container'>
                <img className='profile__image' src={currentUser.avatar} onClick={onImageClick} />
            </div>
            <p className='profile__name'>{currentUser.name}</p>
            <img className='profile__arrow' src={arrowDown} onClick={onArrowClick} />
        </div>
    );
}

export default UserProfile;
