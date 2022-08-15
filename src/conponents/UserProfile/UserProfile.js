import './UserProfile.css';
import arrowDownBlack from '../../images/arrow-down-white.svg'
import arrowDownWhite from '../../images/arrow-down-black.svg'

function UserProfile({ 
    currentUser,
    onImageClick,
    onArrowClick
 }) {

    return (
        <div className='profile'>
            <div className='profile__image-container'>
                <img className='profile__image' src={currentUser.avatar} alt="profile image" onClick={onImageClick} />
            </div>
            <p className='profile__name'>{currentUser.name}</p>
            <img className='profile__arrow profile__arrow_color_black' src={arrowDownBlack} onClick={onArrowClick} />
            <img className='profile__arrow profile__arrow_color_white' src={arrowDownWhite} onClick={onArrowClick} />
        </div>
    );
}

export default UserProfile;
