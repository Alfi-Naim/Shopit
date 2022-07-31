import './Register.css';
import { useState } from "react";
import { Link } from "react-router-dom";

import eyeOpen from '../../images/eye-open.svg'
import eyeClose from '../../images/eye-close.svg'

function Register({ onFormSubmit }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);

  function onSubmitClick(event) {
      event.preventDefault();
      onFormSubmit({email, password, name});
  }

  function togglePasswordShow() {
      setPasswordShow(!passwordShow);
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={onSubmitClick}>
        <h1 className="auth__title">Register</h1>
        <input className="auth__input" value={email || ""} required type='email' onChange={(event) => setEmail(event.target.value)} placeholder="Email"></input>
        <div className="auth__password-wrapper">
          <input className="auth__input  auth__input_type_password" value={password || ""} required type={passwordShow ? 'text' : 'password'} onChange={(event) => setPassword(event.target.value)} placeholder="Password"></input>
          <img className="auth__input-helper" src={passwordShow ? eyeOpen : eyeClose} onClick={togglePasswordShow} />
        </div>
        <input className="auth__input" value={name || ""} required type='text' onChange={(event) => setName(event.target.value)} placeholder="Name"></input>
        <button className="auth__submit">Register</button>
      </form>
      <div className="auth__bottom-wrapper">
        <p className="auth__bottom-text">If You Already Have An Acount</p>
        <Link className="auth__bottom-link" to={"/signin"} >Login</Link>
      </div>
    </div>
  );
}

export default Register;
