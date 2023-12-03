import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SignupForm.css';
import { signup, clearSessionErrors } from '../../store/session';
import Modal from '../Modal/Modal.js'
import LoginForm from './LoginForm.js';
import {useHistory} from 'react-router-dom/cjs/react-router-dom.min';

const monthOptions = Array.from({ length: 12 }, (_, index) => (index + 1).toString().padStart(2, '0'));
const dayOptions = Array.from({ length: 31 }, (_, index) => (index + 1).toString().padStart(2, '0'));
const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 100 }, (_, index) => (currentYear - index).toString());


function SignupForm() {
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthday, setBirthday] = useState({
      month: "",
      day: "",
      year: ""
    });

    const errors = useSelector((state) => state.errors.session);
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const update = (field) => {
        let setState;

        switch (field) {
            case 'email':
                setState = setEmail;
                break;
            case 'name':
                setState = setName;
                break;
            case 'password':
                setState = setPassword;
                break;
            case 'confirmPassword':
                setState = setConfirmPassword;
                break;
            default:
                throw Error('Unknown field in Signup Form');
        }

        return (e) => setState(e.currentTarget.value);
    };

    const openModal = () => {
      setModalIsOpen(true);
    };
    
    const toggleModal = () => {
      setModalIsOpen(!modalIsOpen);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formattedBirthday = `${birthday.year}-${birthday.month}-${birthday.day}`;
    
      const user = {
        email,
        name,
        birthday: formattedBirthday,
        password,
      };
    
      await dispatch(signup(user))
        .then(
        history.push('/')
        )
    };

    return (
        <div className="signup-container">
          <Modal onClose={toggleModal} isOpen={modalIsOpen}><LoginForm toggleModal={toggleModal}/></Modal>
            <form className="session-form" onSubmit={handleSubmit}>
                <span className='create-account'>Create an account</span>
                <div className="user-info">
                    <label htmlFor='email'>Email</label>
                    <input id='email' type="text" value={email} className='signup-input' onChange={update('email')} />
                    <div className="errors">{errors?.email}</div>
                    
                    <label htmlFor='name'>Name</label>
                    <input id='name' type="text" value={name} className='signup-input' onChange={update('name')} />
                    <div className="errors">{errors?.name}</div>

                    <label>
                      Birthday
                      <div className="birthday">
                        <select value={birthday.month} onChange={(e) => setBirthday({ ...birthday, month: e.target.value })}>
                          <option value="">Month</option>
                          {monthOptions.map((month) => (
                            <option key={month} value={month}>{month}</option>
                          ))}
                        </select>
                        <select value={birthday.day} onChange={(e) => setBirthday({ ...birthday, day: e.target.value })}>
                          <option value="">Day</option>
                          {dayOptions.map((day) => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                        <select value={birthday.year} onChange={(e) => setBirthday({ ...birthday, year: e.target.value })}>
                          <option value="">Year</option>
                          {yearOptions.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </label>

                    <label htmlFor='password'>Password</label>
                    <input id='password' type="password" value={password} className='signup-input' onChange={update('password')} />
                    <div className="errors">{errors?.password}</div>

                    <label htmlFor='password'>Confirm Password</label>
                    <input type="password" value={confirmPassword} className='signup-input' onChange={update('confirmPassword')} />
                    <div className="errors">{password !== confirmPassword && 'Confirm Password field must match'}</div>

                    <div className='signup-button'>
                      <button className='button signup-click' type="submit" disabled={!email || !name || !password || password !== confirmPassword}>
                        Sign Up
                      </button>
                    </div>
                </div>
            </form>

            <div className='redirect-user-accounts'>
              <p>Already have an account? </p>
              <button className='login-link' onClick={openModal}>Log in</button>
            </div>
        </div>
    );
}

export default SignupForm;