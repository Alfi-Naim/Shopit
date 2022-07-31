import { useState } from "react";
import { Link } from "react-router-dom";

import eyeOpen from '../../images/eye-open.svg'
import eyeClose from '../../images/eye-close.svg'

function Login({ onFormSubmit }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);

  function onSubmitClick(event) {
    event.preventDefault();
    onFormSubmit({ email, password });
  }

  function togglePasswordShow() {
    setPasswordShow(!passwordShow);
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={onSubmitClick}>
        <h1 className="auth__title">Login</h1>
        <input className="auth__input" value={email || ""} required type='email' onChange={(event) => setEmail(event.target.value)} placeholder="Email"></input>
        <div className="auth__password-wrapper">
          <input className="auth__input auth__input_type_password" value={password || ""} required type={passwordShow ? 'text' : 'password'} onChange={(event) => setPassword(event.target.value)} placeholder="Password"></input>
          <img className="auth__input-helper" src={passwordShow ? eyeOpen : eyeClose} onClick={togglePasswordShow} />
        </div>
        <button className="auth__submit">Login</button>
      </form>
      <div className="auth__bottom-wrapper">
        <p className="auth__bottom-text">If You Don't Have An Acount</p>
        <Link to={"/signup"} className="auth__bottom-link">Register</Link>
      </div>
    </div>
  )
}

export default Login;