import jwtFetch from "./jwt"

export const RECEIVE_APPOINTMENTS = 'appointments/RECEIVE__APPOINTMENTS'
export const RECEIVE_APPOINTMENT = 'appointments/RECEIVE__APPOINTMENT'
export const UPDATE_APPOINTMENT = 'appointments/UPDATE_APPOINTMENT'
export const REMOVE_APPOINTMENT = 'appointments/REMOVE__APPOINTMENT'

export const receiveAppointments = (appointments) => ({
    type: RECEIVE_APPOINTMENTS,
    appointments
})

export const receiveAppointment = (appointment) => ({
    type: RECEIVE_APPOINTMENT,
    appointment
})

export const removeAppointment = (appointmentId) => ({
    type: REMOVE_APPOINTMENT,
    appointmentId
})

export const fetchAppointments = (userId) => async dispatch => {
    const res = await jwtFetch(`/api/appointments/user/${userId}`)

    if (res.ok) {
        const appointments = await res.json()
        dispatch(receiveAppointments(appointments))
    }
}

export const fetchAppointment = (appointmentId) => async dispatch => {
    const res = await jwtFetch(`/api/appointments/${appointmentId}`)

    if (res.ok) {
        const appointment = await res.json()
        dispatch(receiveAppointment(appointment))
    }
}


export const createAppointment = (appointment) => async dispatch => {
    const res = await jwtFetch(('/api/appointments/new'), {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(appointment)
    })

    if (res.ok) {
        const appointment = await res.json()
        dispatch(receiveAppointment(appointment))
    }
}

export const updateAppointment = (appointment) => async dispatch => {
    const res = await jwtFetch((`/api/appointments/${appointment._id}`), {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(appointment)
    })

    if (res.ok) {
        const appointment = await res.json()
        dispatch(receiveAppointment(appointment))
    }
}

export const deleteAppointment = (appointmentId) => async dispatch => {
    const res = await jwtFetch((`/api/appointments/${appointmentId}`), {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(removeAppointment(appointmentId))
    }
}

const appointmentsReducer = (state = {}, action) => {
    let newState = {...state}

    switch(action.type) {
        case RECEIVE_APPOINTMENTS:
            let appointments = {}
            action.appointments.forEach((appt) => {
                appointments[appt._id] = appt
            })
            return appointments
            
        case RECEIVE_APPOINTMENT:
            if (action.appointment._id in newState) {
                newState[action.appointment._id] = action.appointment
                return {...newState}
            } else {
                return {...newState, [action.appointment._id] : action.appointment}
            }
        case REMOVE_APPOINTMENT:
            delete newState[action.appointmentId]
            return newState
        default:
            return state
    }
}

export default appointmentsReducer