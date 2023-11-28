import jwtFetch from './jwt';

const RECEIVE_CONTRACTORS = "contractors/RECEIVE_CONTRACTORS";
const RECEIVE_CONTRACTOR = "contractors/RECEIVE_CONTRACTOR";

const receiveContractors = contractors => ({
    type: RECEIVE_CONTRACTORS,
    contractors
});

const receiveContractor = contractor => ({
    type: RECEIVE_CONTRACTOR,
    contractor
});

export const fetchContractors = () => async dispatch => {
    const res = await jwtFetch ('/api/contractors');
    if (res.ok) {
        const contractors = await res.json();
        dispatch(receiveContractors(contractors));
    }
};

export const fetchContractor = (contractorId) => async dispatch => {
    const res = await jwtFetch (`/api/contractors/${contractorId}`);
    if (res.ok) {
        const contractor = await res.json();
        dispatch(receiveContractor(contractor));
    }
};



const contractorsReducer = (state = { }, action) => {
    const newState = {...state}
    switch(action.type) {
        case RECEIVE_CONTRACTORS:
            return {...action.contractors};
        case RECEIVE_CONTRACTOR:
            return {...newState, [action.contractor.id] : action.contractor}
        default:
            return state;
    }
}

export default contractorsReducer