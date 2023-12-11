import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../../store/appointment';
import AppointmentPreview from './AppointmentPreview'
import { useHistory } from 'react-router-dom'; 
import './AppointmentIndex.css'
import NavBar from '../NavBar/NavBar';

const AppointmentIndex = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const appointments = useSelector((state) => state?.appointments ? Object.values(state.appointments).reverse() : []);
    const history = useHistory();
    
    useEffect(() => {
        if (user && user._id) {
            dispatch(fetchAppointments(user._id));
        }
    }, [dispatch, user]);


    // Check if user is logged out and redirect to the homepage
    useEffect(() => {
        if (!user) {
            history.push('/');  // Redirect to the homepage
        }
    }, [user, history]);
    
    return (
        <>
        <div className='all-appts'>
        {appointments?.length > 0 ?
        <div className='appts-heading'>
            <p>Your Appointments</p>
        </div> 
        : 
        <div className='appts-heading'>
            <p>You have no Appointments</p>
        </div> 
        }
        {appointments.map((appointment) => {
            return <AppointmentPreview appointment={appointment} key={appointment._id} />
        })}
        </div>
        </>
    )
}

export default AppointmentIndex