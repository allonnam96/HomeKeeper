import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Profile from './components/Profile/Profile';
import AboutUsIndex from './components/AboutUs/AboutUs';

import { getCurrentUser } from './store/session';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import ContractorShow from './components/ContractorShow/ContractorShow';
import ContractorsIndex from './components/Contractors/ContractorsCategoryIndex';
import AppointmentIndex from '../src/components/Appointments/AppointmentIndex'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/appointments" component={AppointmentIndex} />
        <Route exact path="/contractors/:id" component={ContractorShow} />
        <Route exact path="/categories/:categoryId" component={ContractorsIndex} />
        <Route exact path="/aboutUs" component={AboutUsIndex} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <ProtectedRoute exact path="/profile" component={Profile} />

      </Switch>
    </>
  );
}

export default App;
