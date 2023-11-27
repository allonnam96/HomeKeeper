import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './LoginForm.css';

import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
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
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <span>HomeKeeper</span>
      <div className='email-password'>
        
      <label htmlFor='email'>Email</label>
        <input type="text"
          id='name'
          value={email}
          onChange={update('email')}
          placeholder="Email"
        />

      <label htmlFor='password'>Password</label>
        <input type="password"
          id='password'
          value={password}
          onChange={update('password')}
          placeholder="Password"
        />
      </div>
          <div className='login-button'>
            <button className='button' type="submit" disabled={!email || !password}>
              Log in
            </button>
          </div>
    </form>
  );
}

export default LoginForm;