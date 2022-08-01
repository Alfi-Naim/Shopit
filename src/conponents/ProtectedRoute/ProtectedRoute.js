import './ProtectedRoute.css';

import React from "react";
import { Navigate } from "react-router-dom"

function ProtectedRoute({ children, loggedIn, loading }) {
    return loading ?
        <div className='loading'>
            <div className="spinner">
                <div className="spinner-head" />
            </div>
        </div> :
        loggedIn ?
            children
            :
            <Navigate to={"/signin"} />
}

export default ProtectedRoute;