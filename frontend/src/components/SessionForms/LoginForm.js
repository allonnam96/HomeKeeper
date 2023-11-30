import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './LoginForm.css';

import { login, clearSessionErrors } from '../../store/session';

function LoginForm ({toggleModal}) {
  const history = useHistory()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
    history.push('/')
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className='close-login' onClick={toggleModal}>×</div>
        <div className='login-info'>
          <div className='homekeeper-login'>HomeKeeper</div>
          <div className='email-password'>
          <label htmlFor='email'>Email</label>
              <input type="text"
                id='name'
                className='login-input'
                value={email}
                onChange={update('email')}
              />
            <label htmlFor='password'>Password</label>
              <input type="password"
                id='password'
                className='login-input'
                value={password}
                onChange={update('password')}
              />
            </div>
                <div className='login-button'>
                  <button className='button login-submit' type="submit" disabled={!email || !password}>
                    Log in
                  </button>
                </div>
          </div>
    </form>
  );
}

export default LoginForm;