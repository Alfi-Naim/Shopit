import './App.css';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Routes, Route } from 'react-router-dom';

import Register from '../Register/Register';
import Login from '../Login/Login';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import mainApi from '../../utils/MainApi';
import * as auth from "../../utils/Auth";

import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import Lists from '../Lists/Lists';

import menu from '../../images/menu.svg'
import UserProfile from '../UserProfile/UserProfile';
import AddListPopup from '../AddListPopup/AddListPopup';
import AddItemForm from '../AddItemForm/AddItemForm';
import Items from '../Items/Items';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import EditUserNamePopup from '../EditUserNamePopup/EditUserNamePopup';
import EditListPopup from '../EditListPopup/EditListPopup';
import EditItemPopup from '../EditItemPopup/EditItemPopup';

function App() {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  const [loading, setLoading] = useState(true);

  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState({ _id: '', items: [] });
  const [currentItem, setCurrentItem] = useState({});

  const [menuPopupOpen, setMenuPopupOpen] = useState(false);
  const [editUserNamePopupOpen, setEditUserNamePopupOpen] = useState(false);
  const [editAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [addListPopupOpen, setAddListPopupOpen] = useState(false);
  const [editListPopupOpen, setEditListPopupOpen] = useState(false);
  const [editItemPopupOpen, setEditItemPopupOpen] = useState(false);

  const handleSignup = (email, password, name) => {
    toast.promise(
      auth.signup(email, password, name),
      {
        loading: 'Signing up...',
        success: () => 'Successfully Signed up',
        error: (err) => err.errorCode === 409 ? 'This email is already in use' : 'An unexpected error occurred',
      }
    )
      .then((res) => {
        if (res) navigate('/signin');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSignin = (email, password) => {
    toast.promise(
      auth.signin(email, password),
      {
        loading: 'Signing in...',
        success: () => 'Successfully Signed in',
        error: (err) => err.errorCode === 401 ? 'Incorrect email or password' : 'An unexpected error occurred',
      }
    )
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setToken(res.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (token) {
      toast.promise(
        mainApi.loadUserInfo(token),
        {
          loading: 'Loading user info',
          success: (res) => `Welcome ${res.name}`,
          error: () => `Error loading user info`,
        }
      )
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
            navigate('/');
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    } else setLoading(false);
  }, [token]);

  useEffect(() => {
    if (token) {
      mainApi.loadUserLists()
        .then((lists) => {
          setLists(lists);
          if (lists.length > 0) loadList(lists[0]._id)
          else setCurrentList({ _id: '', items: [] });
        })
        .catch((err) => {
          toast.error("Error loading lists")
          console.log(err)
        })
    }
  }, [token]);

  const loadList = (listId) => {
    mainApi.loadList(listId)
      .then((list) => {
        if (list) setCurrentList(list);
      })
      .catch((err) => {
        toast.error("Error loading list")
        console.log(err)
      })
  }

  useEffect(() => {
    const closePopupByEscape = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closePopupByEscape);
    return () => document.removeEventListener("keydown", closePopupByEscape);
  }, []);

  useEffect(() => {
    const closePopupByOutsideClick = (evt) => {
      if (evt.target.classList.contains("popup")) {
        closeAllPopups();
      }
    };
    document.addEventListener("click", closePopupByOutsideClick);
    return () => document.removeEventListener("keydown", closePopupByOutsideClick);
  }, []);

  const closeAllPopups = () => {
    setMenuPopupOpen(false);
    setAddListPopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditUserNamePopupOpen(false);
    setEditListPopupOpen(false);
    setEditItemPopupOpen(false);
  }

  const handleMenuButtonClick = () => {
    setMenuPopupOpen(!menuPopupOpen);
  }

  const handleCreateListClick = () => {
    setAddListPopupOpen(true);
  }

  const handleListClick = (listId) => {
    closeAllPopups();
    loadList(listId)
  }

  const handleCategoryClick = () => {

  }

  const handleEditItemClick = (item) => {
    setCurrentItem(item);
    setEditItemPopupOpen(true);
  }

  const handleEditListClick = () => {
    setEditListPopupOpen(true);
  }

  const handleEditProfileImageClick = () => {
    setEditAvatarPopupOpen(true);
  }

  const handleEditProfileNameClick = () => {
    setEditUserNamePopupOpen(true);
  }

  const handleSignoutSubmit = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser({});
    setToken("");
    closeAllPopups();
  }

  const handleItemClick = (item) => {
    item.checked = !item.checked;
    mainApi.updateItem(currentList._id, item)
      .then((res) => {
        setCurrentList(res);
        toast.success(`${item.name} ${item.checked ? 'Checked' : 'Unchecked'}`);
      })
      .catch((err) => {
        console.log(err)
        toast.error(`Error checking ${item.name}`);
      });
  }

  const handleDeleteItemSubmit = (item) => {
    closeAllPopups();
    mainApi.deleteItem(currentList._id, item._id)
      .then((res) => {
        setCurrentList(res);
        toast.success(`${item.name} deleted`);
      })
      .catch((err) => {
        console.log(err)
        toast.error(`Error deleting ${item.name}`);
      });
  }

  const handleEditItemSubmit = (item) => {
    closeAllPopups();
    mainApi.updateItem(currentList._id, item)
      .then((res) => {
        setCurrentList(res);
        toast.success(`Item updated`);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.errorCode === 409 ? "This item name already exists" : "An unexpected error occurred");
      });
  }

  const handleCreateListSubmit = (listName) => {
    closeAllPopups();
    mainApi.createList(listName)
      .then((list) => {
        const updatedLists = [...lists, list]
        setLists(updatedLists);
        toast.success(`List created`);
        if (updatedLists.length === 1) loadList(list._id);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error creating list`);
      });
  }

  const handleAddItemSubmit = (itemName) => {
    mainApi.createItem(currentList._id, itemName)
      .then((res) => {
        setCurrentList(res);
        toast.success(`Item created`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.errorCode === 409 ? "This item name already exists" : "An unexpected error occurred");
      });
  }

  const handleEditAvatarSubmit = (avatar) => {
    closeAllPopups();
    mainApi.updateUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        toast.success(`User avatar updated`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error updating user avatar");
      });
  }

  const handleEditUserNameSubmit = (name) => {
    closeAllPopups();
    mainApi.updateUserName(name)
      .then((res) => {
        setCurrentUser(res);
        toast.success(`User name updated`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error updating user name");
      });
  }

  const handleEditListSubmit = (listName) => {
    closeAllPopups();
    mainApi.updateList(currentList._id, listName)
      .then((res) => {
        setCurrentList(res);
        const updatedLists = [...lists];
        updatedLists.forEach((list) => {
          if (list._id === currentList._id) {
            list.name = listName;
          }
        })
        setLists(updatedLists);
        toast.success(`List updated`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error updating list`);
      });

  }
  const handleDeleteListSubmit = () => {
    closeAllPopups();
    mainApi.deleteList(currentList._id)
      .then(() => {
        const updatedLists = lists.filter((list) => list._id !== currentList._id);
        setLists(updatedLists);
        toast.success(`List deleted`);
        if (updatedLists.length > 0) loadList(updatedLists[0]._id);
        else setCurrentList({ _id: '', items: [] });
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error deleting list`);
      });

  }

  return (
    <div className='page'>
      <div className='page-content'>
        <Toaster position="top-right" />
        <Routes>
          <Route
            path='/signup' element={
              <Register onFormSubmit={handleSignup} />
            } />
          <Route
            path='/signin' element={
              <Login onFormSubmit={handleSignin} />
            } />
          <Route
            path='/'
            element={
              <ProtectedRoute loggedIn={loggedIn} loading={loading}>
                <aside className={`aside ${menuPopupOpen && "aside_visible"}`}>
                  <h1 className='logo'>.Shopit</h1>
                  <Lists
                    lists={lists}
                    currentList={currentList}
                    setCurrentList={handleListClick}
                    onCreateListClick={handleCreateListClick} />
                </aside>
                <main className='main'>
                  <header className='header'>
                    <img className='header__menu-button' src={menu} onClick={handleMenuButtonClick} />
                    <UserProfile
                      currentUser={currentUser}
                      onImageClick={handleEditProfileImageClick}
                      onArrowClick={handleEditProfileNameClick} />
                  </header>
                  {currentList._id !== '' && (<>
                    <AddItemForm onSubmit={handleAddItemSubmit} />
                    <Items
                      list={currentList}
                      onItemClick={handleItemClick}
                      onSettingsClick={handleEditListClick}
                      onCategoryClick={handleCategoryClick}
                      onPenClick={handleEditItemClick}
                      onTrashClick={handleDeleteItemSubmit} />
                  </>)}
                </main>
                <AddListPopup
                  isOpen={addListPopupOpen}
                  onSubmit={handleCreateListSubmit} />
                <EditAvatarPopup
                  isOpen={editAvatarPopupOpen}
                  onSubmit={handleEditAvatarSubmit}
                  currentUser={currentUser} />
                <EditUserNamePopup
                  isOpen={editUserNamePopupOpen}
                  onSubmit={handleEditUserNameSubmit}
                  onOutSideButtonClick={handleSignoutSubmit}
                  currentUser={currentUser} />
                <EditListPopup
                  isOpen={editListPopupOpen}
                  onSubmit={handleEditListSubmit}
                  onOutSideButtonClick={handleDeleteListSubmit}
                  currentList={currentList} />
                <EditItemPopup
                  isOpen={editItemPopupOpen}
                  onSubmit={handleEditItemSubmit}
                  onOutSideButtonClick={handleDeleteItemSubmit}
                  item={currentItem} />
              </ProtectedRoute>
            } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
