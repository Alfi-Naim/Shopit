import './App.css';

import { useState, useEffect, Profiler } from 'react';
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

function App() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem('jwt'));

  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState({ _id: '' });

  const [menuPopupOpen, setMenuPopupOpen] = useState(false);

  function handleSignup(email, password, name) {
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

  function handleSignin(email, password) {
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
            setCurrentUser(res);
            navigate('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      mainApi.loadUserLists()
        .then((lists) => {
          setLists(lists);
          if (lists.length > 0) {
            loadList(lists[0]._id)
          }
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

    //close popups
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
        if (evt.target.classList.contains("popup") || evt.target.classList.contains("main")) {
          closeAllPopups();
        }
      };
      document.addEventListener("click", closePopupByOutsideClick);
      return () => document.removeEventListener("keydown", closePopupByOutsideClick);
    }, []);

  const closeAllPopups = () => {
    setMenuPopupOpen(false);
  }

  const handleMenuButtonClick = () => {
    setMenuPopupOpen(!menuPopupOpen);
  }

  const handleCreateListClick = () => {

  }

  const handleEditProfileImageClick = () => {

  }

  const handleEditProfileNameClick = () => {

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
              <ProtectedRoute token={token}>
                <aside className={`aside ${menuPopupOpen && "aside_visible"}`}>
                  <h1 className='logo'>.Shopit</h1>
                  <Lists
                    lists={lists}
                    currentList={currentList}
                    setCurrentList={loadList}
                    onCreateListClick={handleCreateListClick} />
                </aside>
                <main className='main'>
                  <header className='header'>
                    <img className='header__menu-button' src={menu} onClick={handleMenuButtonClick} />
                    <UserProfile 
                      currentUser={currentUser}
                      onImageClick={handleEditProfileImageClick}
                      onArrowClick={handleEditProfileNameClick}
                    />
                  </header>
                </main>
              </ProtectedRoute>
            } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
