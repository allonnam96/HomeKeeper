import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { fetchContractor } from "../../store/contractors"
import { useState } from "react"
import { updateAppointment } from "../../store/appointment"
import './AppointmentPreview.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


const AppointmentPreview = ({appointment}) => {
    // const history = useHistory()
    const dispatch = useDispatch()
    const contractor = useSelector(state => state?.contractors ? state.contractors[appointment.contractor] : [])
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        dispatch(fetchContractor(appointment?.contractor))
    },[dispatch, appointment?.contractor])

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

    return (
        <div className="appt-preview-container">
            <p className='appt-preview-info'>{formattedDate}</p>
            <p className='appt-preview-info'>{contractor?.name}</p>
            <p className='appt-preview-info'>{appointment?.type}</p>
            {appointment?.status === 'Pending' ? (
                <p className='appt-preview-info appt-status-pending'>{appointment?.status} <span style={{ color: 'orange' }}>&#x23F2;</span></p>
            ) : (
                <p className='appt-preview-info appt-status-confirmed'>{appointment?.status} <span style={{ color: 'green' }}>&#x2714;</span></p>
            )}
        </div>
    )
}

export default AppointmentPreview