import './Register.css';
import { useState } from "react";
import { Link } from "react-router-dom";

import eyeOpen from '../../images/eye-open.svg'
import eyeClose from '../../images/eye-close.svg'

function Register({ onFormSubmit }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  function onSubmitClick(event) {
    event.preventDefault();
    onFormSubmit(email, password, name);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function togglePasswordVisibility() {
    setPasswordVisibility(!passwordVisibility);
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={onSubmitClick}>
        <h1 className="auth__title">Register</h1>
        <input className="auth__input" value={email} type='email' onChange={handleEmailChange} placeholder="Email" required />
        <div className="auth__password-wrapper">
          <input className="auth__input  auth__input_type_password" value={password} type={passwordVisibility ? 'text' : 'password'} onChange={handlePasswordChange} placeholder="Password" required />
          <img className="auth__input-helper" src={passwordVisibility ? eyeOpen : eyeClose} onClick={togglePasswordVisibility} />
        </div>
        <input className="auth__input" value={name} type='text' onChange={handleNameChange} placeholder="Name" required />
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
