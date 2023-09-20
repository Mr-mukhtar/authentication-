import { useRef, useContext } from 'react';
import classes from './ProfileForm.module.css';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const history = useHistory();
  
  const passwordInputRef = useRef(); 
   const authCtx  = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;
   
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDHUcTfihlX_L2tfGc6WWSDBWqbxxbciuk',
       {
        method: 'POST',
        body: JSON.stringify({
         idToken: authCtx.token,
          returnSecureToken: false
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res =>{
        history.replace('/')
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'  ref={passwordInputRef}>New Password</label>
        <input type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
