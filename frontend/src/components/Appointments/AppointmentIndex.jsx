import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../../store/appointment';
import AppointmentPreview from './AppointmentPreview'

const AppointmentIndex = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const appointments = useSelector((state) => state?.appointments ? Object.values(state.appointments).reverse() : []);
    
    useEffect(() => {
        dispatch(fetchAppointments(user._id));
    }, [dispatch, user._id]);

    return (
        appointments.map((appointment) => {
            return <AppointmentPreview appointment={appointment} key={appointment._id} />
        })
    )
}

export default AppointmentIndex