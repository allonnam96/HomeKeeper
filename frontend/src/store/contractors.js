import jwtFetch from './jwt';

const RECEIVE_CONTRACTORS = "contractors/RECEIVE_CONTRACTORS";
const RECEIVE_CONTRACTOR = "contractors/RECEIVE_CONTRACTOR";
const RECEIVE_CATEGORY_CONTRACTORS = "contractors/RECEIVE_CATEGORY_CONTRACTORS"

const receiveContractors = contractors => ({
    type: RECEIVE_CONTRACTORS,
    contractors
});

const receiveContractor = contractor => ({
    type: RECEIVE_CONTRACTOR,
    contractor
});

const receiveCategoryContractors = (categoryId) => ({
    type: RECEIVE_CATEGORY_CONTRACTORS,
    categoryId
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

export const fetchCategoryContractors = (categoryId) => async dispatch => {
    const res = await jwtFetch(`/api/contractors/${categoryId}/contractors`);
    if (res.ok) {
        const contractors = await res.json();
        dispatch(receiveCategoryContractors(contractors));
    }
}

const contractorsReducer = (state = {}, action) => {
    const newState = {...state}
    switch(action.type) {
        case RECEIVE_CONTRACTORS:
            return {...action.contractors};
        case RECEIVE_CONTRACTOR:
            return {...newState, [action.contractor._id] : action.contractor}
        case RECEIVE_CATEGORY_CONTRACTORS:
            return {...action.categoryId};
        default:
            return state;
    }
}

export default contractorsReducer