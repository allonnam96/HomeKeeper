import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import MainSearchBar from '../MainPage/MainSearchBar/MainSearchBar';
import Modal from '../Modal/Modal';
import LoginForm from '../SessionForms/LoginForm';
import { useState } from 'react';
// import ContractorsIndex from '../Contractors/ContractorsIndex';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function NavBar () {
  const history = useHistory()
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  
  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Modal onClose={toggleModal} isOpen={modalIsOpen}><LoginForm toggleModal={toggleModal}/></Modal>
          <Link className="signup-nav-link" to={'/signup'}>Signup</Link>
          <div className="login-nav-link" onClick={openModal}>Login</div>
        </div>
      );
    }
  }

  return (
    <div className="nav-bar-main">
      <h1 onClick={() => {history.push('/')}}>HomeKeeper</h1>
      <MainSearchBar />
      { getLinks() }
    </div>
  );
}

export default NavBar;