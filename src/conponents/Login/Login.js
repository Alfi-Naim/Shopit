import { useState } from "react";
import { Link } from "react-router-dom";

import eyeOpen from '../../images/eye-open.svg'
import eyeClose from '../../images/eye-close.svg'

function Login({ onFormSubmit }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const onSubmitClick = (event) => {
    event.preventDefault();
    onFormSubmit(email, password);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={onSubmitClick}>
        <h1 className="auth__title">Login</h1>
        <input className="auth__input" value={email} type='email' onChange={handleEmailChange} placeholder="Email" required />
        <div className="auth__password-wrapper">
          <input className="auth__input auth__input_type_password" value={password} type={passwordVisibility ? 'text' : 'password'} onChange={handlePasswordChange} placeholder="Password" maxLength='30' required />
          <img className="auth__input-helper" src={passwordVisibility ? eyeOpen : eyeClose} onClick={togglePasswordVisibility} />
        </div>
        <button className="auth__submit">Login</button>
      </form>
      <div className="auth__bottom-wrapper">
        <p className="auth__bottom-text">If You Don't Have An Account</p>
        <Link to={"/signup"} className="auth__bottom-link">Register</Link>
      </div>
    </div>
  )
}

export default Login;