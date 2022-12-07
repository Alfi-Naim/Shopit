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
import EditCategoryPopup from '../EditCategoryPopup/EditCategoryPopup';
import EditListSorting from '../EditListSorting/EditListSorting';

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
  const [editCategoryPopupOpen, setEditCategoryPopupOpen] = useState(false);
  const [editListSortPopupOpen, setEditListSortPopupOpen] = useState(false);

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
          toast.error("Error loading lists");
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
        toast.error("Error loading list");
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
      if (evt.target.classList.contains("overlay") || evt.target.classList.contains("popup")) {
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
    setEditCategoryPopupOpen(false);
    setEditListSortPopupOpen(false);
  }

  const handleMenuButtonClick = () => {
    setMenuPopupOpen(!menuPopupOpen);
  }

  const handleCreateListClick = () => {
    setMenuPopupOpen(false);
    setAddListPopupOpen(true);
  }

  const handleListClick = (listId) => {
    closeAllPopups();
    loadList(listId)
  }

  const handleCategoryClick = (item) => {
    setCurrentItem(item);
    setEditCategoryPopupOpen(true);
  }

  const handleSortClick = () => {
    setEditListSortPopupOpen(true);
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

  const handleItemClick = (item) => { //todo
    item.checked = !item.checked;
    mainApi.checkItem(currentList._id, item)
      .then((res) => {
        setCurrentList(res);
        toast.success(`${item.name} ${item.checked ? 'Checked' : 'Unchecked'}`);
      })
      .catch((err) => {
        console.log(err)
        toast.error("Error checking item");
      });
  }

  const handleDeleteItemSubmit = (item) => {
    closeAllPopups();
    toast.promise(
      mainApi.deleteItem(currentList._id, item._id),
      {
        loading: "Deleting item",
        success: (res) => {
          setCurrentList(res);
          return "Item deleted";
        },
        error: (err) => {
          console.log(err);
          return "Error deleting item"
        },
      }
    );
  }

  const handleEditItemSubmit = (item) => {
    closeAllPopups();
    if (item.name !== item.lastName || item.quantity !== item.lastQuantity || item.category !== item.lastCategory) {
      toast.promise(
        mainApi.updateItem(currentList._id, item),
        {
          loading: "Updating item",
          success: (res) => {
            setCurrentList(res);
            return "Item updated";
          },
          error: (err) => {
            console.log(err);
            return err.errorCode === 409 ? "This item name already exists" : "An unexpected error occurred"
          },
        }
      );
    }
  }

  const handleCreateListSubmit = (listName) => {
    closeAllPopups();
    toast.promise(
      mainApi.createList(listName),
      {
        loading: "Creating list",
        success: (list) => {
          const updatedLists = [...lists, list]
          setLists(updatedLists);
          if (updatedLists.length === 1) loadList(list._id);
          return "List created";
        },
        error: (err) => {
          console.log(err);
          return "Error creating list";
        },
      }
    );
  }

  const handleAddItemSubmit = (itemName) => {
    toast.promise(
      mainApi.createItem(currentList._id, itemName),
      {
        loading: "Creating item",
        success: (res) => {
          setCurrentList(res);
          return "Item created";
        },
        error: (err) => {
          console.log(err);
          return err.errorCode === 409 ? "This item name already exists" : "An unexpected error occurred";
        },
      }
    );
  }

  const handleEditAvatarSubmit = (avatar) => {
    closeAllPopups();
    toast.promise(
      mainApi.updateUserAvatar(avatar),
      {
        loading: "Updating avatar",
        success: (res) => {
          setCurrentUser(res);
          return "Avatar updated";
        },
        error: (err) => {
          console.log(err);
          return "Error updating avatar";
        },
      }
    );
  }

  const handleEditUserNameSubmit = (name) => {
    closeAllPopups();
    toast.promise(
      mainApi.updateUserName(name),
      {
        loading: "Updating user name",
        success: (res) => {
          setCurrentUser(res);
          return "User name updated";
        },
        error: (err) => {
          console.log(err);
          return "Error updating user name";
        },
      }
    );
  }

  const handleEditListSubmit = (listName) => {
    closeAllPopups();
    toast.promise(
      mainApi.updateList(currentList._id, listName, currentList.sortBy),
      {
        loading: "Updating list name",
        success: (res) => {
          setCurrentList(res);
          const updatedLists = [...lists];
          updatedLists.forEach((list) => {
            if (list._id === currentList._id) {
              list.name = listName;
            }
          })
          setLists(updatedLists);
          return "List name updated";
        },
        error: (err) => {
          console.log(err);
          return "Error updating list name";
        },
      }
    );
  }

  const handleEditListSortSubmit = (sortBy) => {
    closeAllPopups();
    toast.promise(
      mainApi.updateList(currentList._id, currentList.name, sortBy),
      {
        loading: "Updating list",
        success: (res) => {
          setCurrentList(res);
          const updatedLists = [...lists];
          updatedLists.forEach((list) => {
            if (list._id === currentList._id) {
              list.sortBy = sortBy;
            }
          })
          setLists(updatedLists);
          return "List sort updated";
        },
        error: (err) => {
          console.log(err);
          return "Error updating list sort";
        },
      }
    );
  }

  const handleDeleteListSubmit = () => {
    closeAllPopups();
    toast.promise(
      mainApi.deleteList(currentList._id),
      {
        loading: "Deleting list",
        success: () => {
          const updatedLists = lists.filter((list) => list._id !== currentList._id);
          setLists(updatedLists);
          if (updatedLists.length > 0) loadList(updatedLists[0]._id);
          else setCurrentList({ _id: '', items: [] });
          return "List deleted";
        },
        error: (err) => {
          console.log(err);
          return "Error deleting list";
        },
      }
    );
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
                <div className={`overlay ${menuPopupOpen && "overlay_visible"}`} />
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
                      onSortClick={handleSortClick}
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
                <EditCategoryPopup
                  isOpen={editCategoryPopupOpen}
                  onSubmit={handleEditItemSubmit}
                  item={currentItem} />
                <EditListSorting
                  isOpen={editListSortPopupOpen}
                  onSubmit={handleEditListSortSubmit} />
              </ProtectedRoute>
            } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
