import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { fetchAppointments } from "../../store/appointment";
import { useSelector } from "react-redux/es/hooks/useSelector";
import './UpdateAppointmentForm.css'

const UpdateAppointmentForm = ({ appointment, onClose, onSubmit }) => {
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(new Date());
    const [appointmentType, setAppointmentType] = useState(appointment.type || "Quote");
    const [appointmentBooked, setAppointmentBooked] = useState(false);

    const appointmentTypeChange = (e) => {
        setAppointmentType(e.target.value);
    };

    const handleDateChange = (date) => {
        setStartDate(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedAppointment = {
            ...appointment,
            status: 'Pending',
            appointmentDate: startDate,
            type: appointmentType,
        };

        onSubmit(updatedAppointment, () => {
            setAppointmentBooked(true);
        });
    };

    return (
        <div className="update-calender-container">
        <form onSubmit={handleSubmit}>
        <label htmlFor="update-appointment-type">Appointment Type</label>
        <br />
        <select
            id="update-appointment-type"
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
        <div className="update-calendar-buttons">
        <button
            className="inverse-button slight-shadow"
            type="submit"
            disabled={appointmentBooked}
        >
            {appointmentBooked ? "Appointment Updated!" : "Update Appointment"}
        </button>
        <button
            className="inverse-button slight-shadow"
            type="button"
            onClick={onClose}
        >
            Cancel
        </button>
        </div>
        </form>
        </div>
    );
};

export default UpdateAppointmentForm;