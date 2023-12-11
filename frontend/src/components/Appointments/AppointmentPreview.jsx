import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContractor } from "../../store/contractors";
import { updateAppointment, deleteAppointment, fetchAppointments } from "../../store/appointment";
import "./AppointmentPreview.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Modal from "../Modal/Modal";
import UpdateAppointmentForm from "./UpdateAppointmentForm";

const AppointmentPreview = ({ appointment }) => {
    const contractor = useSelector((state) => state?.contractors ? state.contractors[appointment.contractor] : []);
    const [formattedDate, setFormattedDate] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const dispatch = useDispatch();
    // const userId = useSelector((state) => state.session.user._id);
    const userId = useSelector((state) => state?.session?.user?._id);
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        if (typeof appointment.contractor !== 'object' && appointment.contractor !== null) {
            dispatch(fetchContractor(appointment.contractor));
        }
    }, [dispatch, appointment.contractor]);

    useEffect(() => {
        if (appointment?.appointmentDate) {
            const date = new Date(appointment?.appointmentDate);
            const formatted = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
        hour12: true,
            }).format(date);
            setFormattedDate(formatted);
            }
        }, [appointment]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (appointment?.status === 'Pending') {
                dispatch(updateAppointment({
                    ...appointment,
                    status: 'Confirmed'
                })).then(() => dispatch(fetchAppointments(userId)));
                window.location.reload(false)
            }
        }, 5000);

        return () => clearTimeout(timeoutId)

    }, [dispatch, appointment]);

    const handleDelete = () => {
        dispatch(deleteAppointment(appointment._id)).then(() => dispatch(fetchAppointments(userId)))
    };

    const handleUpdate = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmitUpdate = (updatedAppointment) => {
        dispatch(updateAppointment(updatedAppointment)).then(dispatch(fetchAppointments(userId)))
        setModalIsOpen(false);
        window.location.reload(false)
    };

    const backgroundImageStyle = {
        backgroundImage: `url(${contractor?.photoUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <div className="appt-preview-container">
            <div className="appt-preview-individual">
            <div className="contractor-preview-image-appt" style={backgroundImageStyle}></div>
                <div className="appt-preview-info appt-preview-name">{contractor?.name}</div>
            </div>
            <div className='appt-time-type'>
                <p className="appt-preview-info">{formattedDate}</p>
                <p className="appt-preview-info">{appointment?.type}</p>
            </div>
            
            <div>
            </div>
            <div>
                {appointment?.status === "Pending" ? (
                    <p className="appt-preview-info appt-status-pending">
                    {appointment?.status}{" "}
                    <span style={{ color: "orange" }}>&#x23F2;</span>
                    </p>
                ) : (
                    <p className="appt-preview-info appt-status-confirmed">
                    {appointment?.status}{" "}
                    <span style={{ color: "green" }}>&#x2714;</span>
                    </p>
                )}
            </div>
            <div>
                <button className="button update-appt" onClick={handleUpdate}>Reschedule</button>
                <button className="button delete-appt" onClick={handleDelete}>Cancel</button>
            </div>
            <Modal onClose={closeModal} isOpen={modalIsOpen}>
                <UpdateAppointmentForm
                appointment={appointment}
                onClose={closeModal}
                onSubmit={handleSubmitUpdate}
                />
            </Modal>
        </div>
    );
};

    export default AppointmentPreview;