import './App.css';

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router-dom";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import Register from '../Register/Register';
import Login from '../Login/Login';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className='page'>
      <div className='page-content'>
        <Toaster position="top-right" />
        <Routes>
          <Route
            path='/signup'
            element={
              <Register />
            } />
          <Route
            path='/signin'
            element={
              <Login />
            } />
          <Route
            path='/'
            element={
              <ProtectedRoute loggedIn={loggedIn}>
              </ProtectedRoute>
            } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
