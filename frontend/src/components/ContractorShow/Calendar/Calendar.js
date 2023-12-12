import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { createAppointment } from '../../../store/appointment';
import Modal from '../../Modal/Modal';
import LoginForm from '../../SessionForms/LoginForm';

const Calendar = ({ contractor }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [startDate, setStartDate] = useState(new Date());
    const [formData, setFormData] = useState({
        name: '',
    });
    const [appointmentType, setAppointmentType] = useState("Quote");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [appointmentBooked, setAppointmentBooked] = useState(false);

    const appointmentTypeChange = (e) => {
        setAppointmentType(e.target.value);
    };
    const openModal = () => {
        setModalIsOpen(true);
    };

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };

    const handleDateChange = (date) => {
        setStartDate(date);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addAppointment = async (e) => {
        e.preventDefault();
        if (user) {
        const appointment = {
            appointmentDate: startDate,
            status: 'Pending',
            type: appointmentType,
            contractor: contractor._id,
            user: user._id,
        };

        // debugger

        try {
            await dispatch(createAppointment(appointment));
            setAppointmentBooked(true);
        } catch (error) {
            console.error('Error creating appointment:', error);
        }
        } else {
            openModal();
        }
    };

    return (
        <div className="calendar">
        <Modal onClose={toggleModal} isOpen={modalIsOpen}>
            <LoginForm toggleModal={toggleModal} />
        </Modal>
        <form onSubmit={addAppointment}>
                <label htmlFor="appointment-type">Appointment Type</label>
                <br />
                <select
                    id="appointment-type"
                    className="slight-shadow"
                    value={appointmentType}
                    onChange={appointmentTypeChange}
                >
                    <option value="default">Select One</option>
                    <option value="Quote">Quote</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Other">Other</option>
                </select>
            <div>
            <label>Select A time</label>
            <DatePicker
                inline
                selected={startDate}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="Pp"
            />
            </div>
            <button className="inverse-button slight-shadow" type="submit" disabled={appointmentBooked}>
            {appointmentBooked ? history.push('/appointments') : 'Book Appointment'}
            </button>
        </form>
        </div>
    );
};

export default Calendar;

