import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import MainSearchBar from '../MainPage/MainSearchBar/MainSearchBar';
import Modal from '../Modal/Modal';
import Dropdown from '../Dropdown/Dropdown';
import LoginForm from '../SessionForms/LoginForm';
import house_icon from '../../img/house-icon-clipart-transparent-background-free-png.webp'
import { ReactComponent as UserIcon } from "../../img/UserIcon.svg";
import { useEffect, useRef, useState } from 'react';
// import ContractorsIndex from '../Contractors/ContractorsIndex';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function NavBar () {
  const history = useHistory()
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      const userIcon = document.getElementById("user-icon")
      console.log(e.target)
      console.log(userIcon)
      if (userDropdownRef.current
          && !userDropdownRef.current.contains(e.target)
          && !userIcon.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [userDropdownRef]);

  const handleApptClick = () => {
    if (loggedIn) {
      history.push('/appointments')
    } else {
      toggleModal()
    }
  }

  const handleAboutClick = () => {
    if (loggedIn) {
      history.push('/AboutUs')
    } else {
      toggleModal()
    }
  }

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
      const userDropdown = [
        { value: "Appointments", fn: handleApptClick },
        { value: "About Us", fn: handleAboutClick},
        { value: "Logout", fn: logoutUser }
      ];

      return (
        <div className="links-auth">
          <UserIcon id="user-icon" onClick={() => setUserDropdownOpen(!userDropdownOpen)} />
          {userDropdownOpen ? <Dropdown className='user-dropdown' children={userDropdown} ref={userDropdownRef}/> : <></>}
        </div>
      );
    } else {
      return (
        // <div className='navbar-all'>
        <div className="links-auth">
          <Modal onClose={toggleModal} isOpen={modalIsOpen}><LoginForm toggleModal={toggleModal}/></Modal>
          <Link className="signup-nav-link" to={'/signup'}>Signup</Link>
          <div className="login-nav-link" onClick={openModal}>Login</div>
        </div>
      );
    }
  }

  return (
    <>
      <div className="nav-bar-main">
        <h1 onClick={() => {history.push('/')}}> {/*<img className='house-icon-navbar' src={house_icon}></img> */} HomeKeeper</h1>
        { getLinks() }
      </div>
    </>
  );
}

export default NavBar;