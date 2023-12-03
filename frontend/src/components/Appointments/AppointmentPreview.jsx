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
    // const userId = useSelector((state) => state.session.user._id)

    useEffect(() => {
        console.log("Fetching contractor with ID:", appointment.contractor);
        dispatch(fetchContractor(appointment.contractor));
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

    const handleDelete = () => {
        dispatch(deleteAppointment(appointment._id))
    };

    const handleUpdate = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmitUpdate = (updatedAppointment) => {
        dispatch(updateAppointment(updatedAppointment));
        setModalIsOpen(false);
    };

    return (
        <div className="appt-preview-container">
        <p className="appt-preview-info">{formattedDate}</p>
        <p className="appt-preview-info">{contractor?.name}</p>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
        <p className="appt-preview-info">{appointment?.type}</p>
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