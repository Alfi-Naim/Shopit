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

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem('jwt'));
  const navigate = useNavigate();

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
              </ProtectedRoute>
            } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
