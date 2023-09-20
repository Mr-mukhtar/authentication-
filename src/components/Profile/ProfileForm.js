import { useRef, useContext } from 'react';
import classes from './ProfileForm.module.css';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const history = useHistory();
  
  const newPasswordInputRef = useRef(); 
   const authCtx  = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
  const enteredNewPassword = newPasswordInputRef.current.value;
  // add validation
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDHUcTfihlX_L2tfGc6WWSDBWqbxxbciuk',
       {
        method: 'POST',
        body: JSON.stringify({
         idToken: authCtx.token,
         password: enteredNewPassword,
          returnSecureToken: false
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res =>{
        // assumption: always succed
        history.replace('/')
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password' minLength ="7"  ref={newPasswordInputRef}>New Password</label>
        <input type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
